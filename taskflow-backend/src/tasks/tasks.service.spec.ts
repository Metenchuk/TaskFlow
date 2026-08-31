import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockPrisma = {
  task: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
    delete: jest.fn(),
  },
  $transaction: jest.fn(),
};

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    jest.clearAllMocks();
  });

  it('findByProject повертає задачі відсортовані за order', async () => {
    const tasks = [{ id: '1', title: 'Task 1', order: 0 }];
    mockPrisma.task.findMany.mockResolvedValue(tasks);
    const result = await service.findByProject('project-1');
    expect(result).toEqual(tasks);
    expect(mockPrisma.task.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { projectId: 'project-1' } })
    );
  });

  it('findOne кидає NotFoundException якщо задачу не знайдено', async () => {
    mockPrisma.task.findUnique.mockResolvedValue(null);
    await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException);
  });

  it('findOne повертає задачу якщо вона існує', async () => {
    const task = { id: '1', title: 'Task 1' };
    mockPrisma.task.findUnique.mockResolvedValue(task);
    const result = await service.findOne('1');
    expect(result).toEqual(task);
  });

  it('create створює задачу з дефолтним статусом todo', async () => {
    mockPrisma.task.count.mockResolvedValue(0);
    mockPrisma.task.create.mockResolvedValue({ id: '1', title: 'New Task', status: 'todo' });
    const result = await service.create({ title: 'New Task', projectId: 'p-1' });
    expect(mockPrisma.task.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'todo', priority: 'medium' }),
      })
    );
    expect(result.status).toBe('todo');
  });

  it('remove видаляє задачу за id', async () => {
    mockPrisma.task.delete.mockResolvedValue({ id: '1' });
    await service.remove('1');
    expect(mockPrisma.task.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});