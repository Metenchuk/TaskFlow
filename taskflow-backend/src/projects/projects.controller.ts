import { Body, Controller, Get, Param, Post, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { FromTemplateDto } from './dto/from-template.dto';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projects: ProjectsService) {}

  @Get()
  findAll(@Req() req: any) {
    return this.projects.findAll(req.user.id);
  }

  @Get('templates')
  templates() {
    return this.projects.templates();
  }

  @Get(':id/overview')
  overview(@Req() req: any, @Param('id') id: string) {
    return this.projects.overview(req.user.id, id);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.projects.findOne(req.user.id, id);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateProjectDto) {
    return this.projects.create(req.user.id, dto);
  }

  @Post('from-template')
  fromTemplate(@Req() req: any, @Body() dto: FromTemplateDto) {
    return this.projects.createFromTemplate(req.user.id, dto.templateKey, dto.title);
  }
}