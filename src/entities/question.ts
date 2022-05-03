import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity
} from "typeorm"

@Entity('questions')
export class Question extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column('text')
    language: string;

    @Column('text', {
        nullable: true,
    })
    question: string;

    @Column('integer')
    category: number;
}