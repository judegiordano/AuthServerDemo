import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, } from "typeorm";

@Entity("Users", { schema: "dbo" })
export class Users extends BaseEntity {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", { name: "username", nullable: true, length: 255 })
	username: string | null;

	@Column("varchar", { name: "password", nullable: true, length: 255 })
	password: string | null;

	@Column("varchar", { name: "email", nullable: true, length: 255 })
	email: string | null;

	@Column("datetime", { name: "created", nullable: true })
	created: Date | null;

	@Column("datetime", { name: "lastUpdated", nullable: true })
	lastUpdated: Date | null;
}
