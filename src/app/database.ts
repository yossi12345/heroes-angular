import { Observable, of } from "rxjs"

const heroes:Hero[]=[]
const users:User[]=[]
export function getAllHeroes(amount:number,page:number=1):Observable<{heroes:Hero[],status:number}>{
    if (!(amount>=1&&page>=1))
        throw new Error('amount or page cant be negative')
    const result:Hero[]=[]
    for(let i=(page-1)*amount;i<heroes.length&&i<(page*amount);i++)
        result.push(heroes[i])
    return of({
        heroes:result,
        status:200
    })
}
export function signIn(username:string,password:string){
    const user=getUserByUsername(username)
    if (user&&user.password===password)
        return {user,token:user.username,status:200}
    return {
        message:'unable to sign in',
        status:401
    } 
}
export function signUp(username:string,password:string){
    if (!getUserByUsername(username)){
        const user=new User(username,password)
        return {user,token:user.username,status:201}
    }
    return {
        message:'this username already exist',
        status:422
    }
}
function getUserByUsername(username:string){
    const user=users.find((user:User)=>user.username===username)
    return user?user:null
}
export function getUserByToken(token:string){
    return getUserByUsername(token)
}
// function generateUUID(){
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, character=> {
//       const randomNumFrom0To15 = Math.floor(Math.random() * 16)
//       const randomHexDigit = character === 'x' ? randomNumFrom0To15 : (randomNumFrom0To15 & 0x3 | 0x8)
//       return randomHexDigit.toString(16)
//     })
// } 
export function getUserHeroes(token:string,page:number):Observable<{heroes:Hero[],status:200}|{message:string,status:404}>{
    if (!(page>=1))
        throw new Error('page cant be negative')
    const user:User|null=getUserByToken(token)
    if (user){
        const result:Hero[]=[]
        for(let i=(page-1)*3;i<user.heroes.length&&i<(page*3-1);i++)
            result.push(user.heroes[i])
        return of({
            heroes:result,
            status:200
        })
    }
    return of({
        message:'the token not recognized',
        status:404
    })
}
export class User{
    heroes:Hero[]
    username: string;
    password: string;
    constructor(username:string, password:string){
        this.username=username
        this.password=password
        this.heroes=[]
        console.log(this)
        users.push(this)
    }
   
}
export class Hero{
    imagePath:string
    amountOfTrainingsToday:number
    level:number
    name: string
    lastTrainingDate:Date
    owner:User|null
    constructor(name:string,imagePath:string){
        this.imagePath=imagePath
        this.name=name
        this.amountOfTrainingsToday=0
        this.level=0
        this.lastTrainingDate=new Date()
        this.owner=null
        heroes.push(this)
    }
    train(token:string){
        const user=getUserByToken(token)
        if (!user||!user.heroes.includes(this)){
            return {
                message:"this user doesn't own this hero",
                status:404
            }
        }
        const allowedNextTrainDate=this.getAllowedNextTrainingDate()
        const now=new Date()
        if (now.getTime()<allowedNextTrainDate.getTime()){
            return {
                message:"can't be trained now",
                allowedNextTrainDate,
                status:400
            }
        }
        this.level+=Math.floor(Math.random()*10000)/100
        this.lastTrainingDate=now
        this.amountOfTrainingsToday=this.amountOfTrainingsToday<5?(this.amountOfTrainingsToday+1):1
        return {
            message:'trained succefully',
            allowedNextTrainDate,
            status:200,
        }
    }
    getAllowedNextTrainingDate():Date{
        const now=new Date()
        if (this.amountOfTrainingsToday<5)
            return now
        const milisecondsInDay=1000*10*6*60*24
        if ((now.getTime()-this.lastTrainingDate.getTime())>=milisecondsInDay)
            return now
        const allowedNextTrainingDate={...this.lastTrainingDate}
        allowedNextTrainingDate.setTime(this.lastTrainingDate.getTime()+milisecondsInDay)
        return allowedNextTrainingDate
    }
}
export function giveHero(hero:Hero,token:string){
    const user=getUserByToken(token)
    console.log("lll",user)
    if (!user||hero.owner){
        return {
            message:"the user already has this hero",
            status:400
        }
    }
    user.heroes.push(hero)
    hero.owner=user
    console.log("lll")
    return {
        message:"the hero was given to the user successfully",
        status:200
    }
}
export function removeHero(hero:Hero,token:string){
    const user=getUserByToken(token)
    if (!user){
        return {
            message:'the user isnt found',
            status:404
        }
    }
    const heroIndex=user.heroes.indexOf(hero)
    if (heroIndex===-1){
        return {
            message:"the user doesn't have this hero",
            status:404
        }
    }
    user.heroes.splice(heroIndex,1)
    hero.owner=null
    return {
        message:"the hero was taken from the user successfully",
        status:200
    }
}
new User('yossi1','yugiohgx')
new User('yossi2','yugiohgx')
new User('yossi3','yugiohgx')
new User('yossi4','yugiohgx')
new User('dimitri1','postgress')
new User('dimitri2','postgress')
new User('dimitri3','postgress')
new User('dimitri4','postgress')
new User('amit','ClashRoyale')
new User('raz','Physics') 
new User('mor meir','12345678') 
new Hero('empowering dragon','assets/images/empowering-dragon.jpg')
new Hero('black rose dragon','assets/images/black-rose-dragon.jpg')
new Hero('blue eyes white dragon','assets/images/blue-eyes-white-dragon.jpg')
new Hero('cyber dragon','assets/images/cyber-dragon.jpg')
new Hero('hundred dragon','assets/images/hundred-dragon.jpg')
new Hero('obelisk the tormentor','assets/images/obelisk-the-tormentor.jpg')
new Hero('rainbow dragon','assets/images/rainbow-dragon.jpg')
new Hero('red eyes black dragon','assets/images/red-eyes-black-dragon.jpg')
new Hero('slifer the sky dragon','assets/images/slifer-the-sky-dragon.jpg')
new Hero('stardust dragon','assets/images/stardust-dragon.jpg')
new Hero('tempest hero','assets/images/tempest-hero.jpg')
new Hero('winged god dragon of ra','assets/images/winged-god-dragon-of-ra.jpg')
const now=new Date().getTime()
for (let i=0;i<heroes.length;i++){
    if (now-heroes[i].lastTrainingDate.getTime()>=86400000)
        heroes[i].amountOfTrainingsToday=0
}
