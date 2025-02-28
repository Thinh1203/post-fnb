import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('auth')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}
  @Post()
  async scanQRCode(@Body() body: any) {
    const { boxId } = body;

    const existingSession = await this.sessionService.findSessionByBoxId(boxId);

    if (existingSession.data) {
      return {
        message: 'This box already has an active session.',
        session: null,
      };
    }

    const newSession = await this.sessionService.createSession(boxId);

    return { message: 'Session created successfully', session: newSession };
  }

  @Delete(':id')
  async delSession(@Param('id') id: string) {
    return this.sessionService.delSession(id);
  }

  @Get()
  async getAllSession(@Query() query: any) {
    return this.sessionService.getAllSession(query);
  }
}
