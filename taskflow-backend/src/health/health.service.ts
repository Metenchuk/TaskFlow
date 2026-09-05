import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type ProjectHealth = {
  id: string;
  title: string;
  color: string;
  score: number;
  grade: 'excellent' | 'good' | 'at_risk' | 'critical';
  total: number;
  done: number;
  overdue: number;
  progress: number;
  factors: { label: string; impact: number }[];
};

const DAY = 86_400_000;

@Injectable()
export class HealthService {
  constructor(private prisma: PrismaService) {}

  async projectsHealth(userId: string): Promise<ProjectHealth[]> {
    const projects = await this.prisma.project.findMany({
      where: { ownerId: userId },
      include: {
        tasks: {
          select: { status: true, dueDate: true, doneAt: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const now = Date.now();

    return projects.map((p) => {
      const total = p.tasks.length;
      const done = p.tasks.filter((t) => t.status === 'done').length;
      const open = p.tasks.filter((t) => t.status !== 'done');
      const overdue = open.filter((t) => t.dueDate && new Date(t.dueDate).getTime() < now).length;
      const progress = total ? Math.round((done / total) * 100) : 0;

      const lastDone = p.tasks
        .filter((t) => t.doneAt)
        .map((t) => new Date(t.doneAt!).getTime())
        .sort((a, b) => b - a)[0];

      const factors: { label: string; impact: number }[] = [];
      let score = 100;

      const overdueRatio = open.length ? overdue / open.length : 0;
      const overduePenalty = Math.round(overdueRatio * 40);
      if (overduePenalty > 0) {
        score -= overduePenalty;
        factors.push({ label: `${overdue} overdue task${overdue > 1 ? 's' : ''}`, impact: -overduePenalty });
      }

      if (total === 0) {
        score -= 25;
        factors.push({ label: 'No tasks yet', impact: -25 });
      } else {
        const progressBonus = Math.round((progress / 100) * 15);
        if (progressBonus > 0) {
          score += progressBonus;
          factors.push({ label: `${progress}% complete`, impact: progressBonus });
        }
      }

      if (lastDone) {
        const daysSince = Math.floor((now - lastDone) / DAY);
        if (daysSince > 14) {
          const stalePenalty = Math.min(20, Math.round((daysSince - 14) / 2));
          score -= stalePenalty;
          factors.push({ label: `Stale for ${daysSince} days`, impact: -stalePenalty });
        } else if (daysSince <= 3) {
          score += 8;
          factors.push({ label: 'Recently active', impact: 8 });
        }
      } else if (total > 0) {
        score -= 15;
        factors.push({ label: 'Nothing completed yet', impact: -15 });
      }

      score = Math.max(0, Math.min(100, score));

      const grade: ProjectHealth['grade'] =
        score >= 80 ? 'excellent' : score >= 60 ? 'good' : score >= 40 ? 'at_risk' : 'critical';

      return { id: p.id, title: p.title, color: p.color, score, grade, total, done, overdue, progress, factors };
    });
  }

  async summary(userId: string) {
    const list = await this.projectsHealth(userId);
    if (list.length === 0) {
      return { average: 0, total: 0, atRisk: 0, healthy: 0, projects: [] };
    }
    const average = Math.round(list.reduce((s, p) => s + p.score, 0) / list.length);
    const atRisk = list.filter((p) => p.grade === 'at_risk' || p.grade === 'critical').length;
    const healthy = list.filter((p) => p.grade === 'excellent' || p.grade === 'good').length;
    return { average, total: list.length, atRisk, healthy, projects: list };
  }
}