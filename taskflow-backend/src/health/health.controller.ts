import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HealthService } from './health.service';

@UseGuards(JwtAuthGuard)
@Controller('health')
export class HealthController {
  constructor(private health: HealthService) {}

  @Get('projects')
  projects(@Req() req: any) {
    return this.health.summary(req.user.id);
  }
}