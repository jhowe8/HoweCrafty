import { IsArray, IsDefined, IsEnum, IsInt, Min, Max, IsUrl } from "class-validator"
import { Type } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

enum ColorEnum {
    Orange,
    Yellow,
    Green,
    Cyan,
    Blue,
    Magenta,
    Purple,
    White,
    Black,
    Grey,
    Silver,
    Pink,
    Maroon,
    Brown,
    Beige,
    Tan,
    Peach,
    Lime,
    Olive,
    Turquoise,
    Teal,
    Navy_blue,
    Indigo,
    Violet,
}

enum TimeOfTheYearEnum {
    Spring,
    Summer,
    Fall,
    Winter,
    Valentines_Day,
    St_Patricks_Day,
    Easter,
    July_4th,
    Halloween,
    Thanksgiving,
    Christmas,
}

@Entity()
export class Wreath extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Type(() => Number)
    id: number

    @Column()
    @IsDefined()
    @IsInt()
    @Min(10)
    @Max(40)
    @Type(() => Number)
    size: number

    @Column()
    @IsDefined()
    @Min(5)
    @Max(120)
    @Type(() => Number)
    price: number

    @Column("varchar", { array: true })
    @IsDefined()
    @IsArray()
    @IsEnum(ColorEnum, { each: true })
    color: ColorEnum[]

    @Column("varchar", { array: true })
    @IsDefined()
    @IsArray()
    @IsEnum(TimeOfTheYearEnum, { each: true })
    timeOfTheYear: TimeOfTheYearEnum[]

    @Column("varchar", { array: true })
    @IsDefined()
    @IsArray()
    @IsUrl({}, { each: true })
    imageUrl: string[]
}
// @Entity()
// export class EnumColor extends BaseEntity {
//     @OneToMany(type => Color, color => color.colorId)
//     @PrimaryGeneratedColumn()
//     @Type(() => Number)
//     colorId: number

//     @Column({ type: 'varchar', length: 30, unique: true })
//     color: string
// }

// @Entity()
// export class EnumTimeOfTheYear extends BaseEntity {
//     @OneToMany(type => TimeOfTheYear, timeOfTheYear => timeOfTheYear.timeOfTheYearId)
//     @PrimaryGeneratedColumn()
//     @Type(() => Number)
//     timeOfTheYearId: number

//     @Column({ type: 'varchar', length: 50, unique: true })
//     timeOfTheYear: string
// }

// @Entity()
// export class Color extends BaseEntity {
//     //@ManyToOne(type => Wreath, wreath => wreath.id)
//     @PrimaryColumn()
//     @Type(() => Number)
//     wreathId: number
//     @ManyToOne(() => Wreath, wreath => wreath.id)
//     @JoinColumn({ name: "id" })
//     target: Wreath

//     //@ManyToOne(type => EnumColor, enumColor => enumColor.colorId)
//     @PrimaryColumn()
//     @Type(() => Number)
//     colorId: number
//     @ManyToOne(() => EnumColor, enumColor => enumColor.colorId)
//     @JoinColumn({ name: "colorId" })
//     sender: EnumColor
// }

// @Entity()
// export class TimeOfTheYear extends BaseEntity {
//     //@ManyToOne(type => Wreath, wreath => wreath.id)
//     @PrimaryColumn()
//     @Type(() => Number)
//     wreathId: number

//     //@ManyToOne(type => EnumTimeOfTheYear, enumTimeOfTheYear => enumTimeOfTheYear.timeOfTheYearId)
//     @PrimaryColumn()
//     @Type(() => Number)
//     timeOfTheYearId: number
//     @ManyToOne(() => EnumTimeOfTheYear, enumTimeOfTheYear => enumTimeOfTheYear.timeOfTheYearId)
//     @JoinColumn({ name: "timeOfTheYearId" })
//     owner: EnumTimeOfTheYear
// }
