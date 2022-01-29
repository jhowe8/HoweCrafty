import { IsArray, IsDefined, IsEnum } from "class-validator"

enum TimeOfTheYear {
    halloween = 0,
    christmas = 1,
    easter = 2,
    spring = 3,
    summer = 4,
    fall = 5,
    winter = 6
}

export class Wreath {
    @IsDefined()
    size: number
    @IsDefined()
    price: number
    @IsDefined()
    color: string
    @IsDefined()
    @IsArray()
    @IsEnum(TimeOfTheYear, { each: true })
    timeOfTheYear: TimeOfTheYear[]
}