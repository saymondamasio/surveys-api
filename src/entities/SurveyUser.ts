import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Survey } from './Survey'
import { User } from './User'

@Entity('surveys_users')
export class SurveyUser {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column()
  survey_id: string

  @ManyToOne(() => Survey)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey

  @Column()
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  value: number

  @CreateDateColumn()
  created_at: Date
}
