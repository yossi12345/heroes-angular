import { Observable, of } from "rxjs"
const genericHeroDescription="dragons of lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem" 
const heroRestTimeInMiliseconds=86400000
const heroes:Hero[]=[]
const users:User[]=[]
export function getAllHeroes(page:number=1):Observable<{heroes:Hero[],status:number,amount:number}>{
    if (page<1)
        throw new Error('amount or page cant be negative')
    const result:Hero[]=[]
    for(let i=(page-1)*3;i<heroes.length&&i<(page*3);i++)
        result.push(heroes[i])
    return of({
        heroes:result,
        amount:heroes.length,
        status:200

    })
}
export function getSpecificHero(heroName:string):Observable<{message:string,status:404}|{hero:Hero,status:200}>{
    const hero=heroes.find((hero)=>(hero.name===heroName))
    if (hero) {
        return of({
            hero,
            status:200
        })
    }
    return of({
        status:404,
        message:'hero not found'
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
export function getUserHeroes(token:string):Observable<{heroes:Hero[],status:200}|{message:string,status:404}>{
    const user:User|null=getUserByToken(token)
    if (user){
        return of({
            heroes:[...user.heroes],
            status:200,
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
        //console.log(this)
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
    description:string
    constructor(name:string,imagePath:string,description:string){
        this.imagePath=imagePath
        this.name=name
        this.amountOfTrainingsToday=0
        this.level=0
        this.lastTrainingDate=new Date()
        this.owner=null
        this.description=description
        heroes.push(this)
    }
    train(token:string):{message:string,status:404}|{message:string,allowedNextTrainDate:Date,status:400|200}{
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
            message:'trained successfully',
            allowedNextTrainDate,
            status:200,
        }
    }
    getAllowedNextTrainingDate():Date{
        const now=new Date()
        const lastTrainingDateTime=this.lastTrainingDate.getTime()
        if (this.amountOfTrainingsToday<5||(now.getTime()-lastTrainingDateTime)>=heroRestTimeInMiliseconds)
            return now
        return new Date(lastTrainingDateTime+heroRestTimeInMiliseconds)
    }
}
export function giveHero(hero:Hero,token:string){
    const user=getUserByToken(token)
    if (!user||hero.owner){
        return of({
            message:"the user already has this hero",
            status:400
        })
    }
    user.heroes.push(hero)
    hero.owner=user
    return of({
        message:"the hero was given to the user successfully",
        status:200
    })
}
export function removeHero(hero:Hero,token:string){
    const user=getUserByToken(token)
    if (!user){
        return of({
            message:'the user isnt found',
            status:404
        })
    }
    const heroIndex=user.heroes.indexOf(hero)
    if (heroIndex===-1){
        return of({
            message:"the user doesn't have this hero",
            status:404
        })
    }
    user.heroes.splice(heroIndex,1)
    hero.owner=null
    return of({
        message:"the hero was taken from the user successfully",
        status:200
    })
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
new Hero('empowering dragon','assets/images/empowering-dragon.jpg',genericHeroDescription)
new Hero('black rose dragon','assets/images/black-rose-dragon.jpg',genericHeroDescription)
new Hero('blue eyes white dragon','assets/images/blue-eyes-white-dragon.jpg',genericHeroDescription)
new Hero('cyber dragon','assets/images/cyber-dragon.jpg',genericHeroDescription)
new Hero('hundred dragon','assets/images/hundred-dragon.jpg',genericHeroDescription)
new Hero('obelisk the tormentor','assets/images/obelisk-the-tormentor.jpg',genericHeroDescription)
new Hero('rainbow dragon','assets/images/rainbow-dragon.jpg',genericHeroDescription)
new Hero('red eyes black dragon','assets/images/red-eyes-black-dragon.jpg',genericHeroDescription)
new Hero('slifer the sky dragon','assets/images/slifer-the-sky-dragon.jpg',genericHeroDescription)
new Hero('stardust dragon','assets/images/stardust-dragon.jpg',genericHeroDescription)
new Hero('tempest hero','assets/images/tempest-hero.jpg',genericHeroDescription)
new Hero('winged god dragon of ra','assets/images/winged-god-dragon-of-ra.jpg',genericHeroDescription)
const now=new Date().getTime()
for (let i=0;i<heroes.length;i++){
    if (now-heroes[i].lastTrainingDate.getTime()>=heroRestTimeInMiliseconds)
        heroes[i].amountOfTrainingsToday=0
}








// function generateUUID(){
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, character=> {
//       const randomNumFrom0To15 = Math.floor(Math.random() * 16)
//       const randomHexDigit = character === 'x' ? randomNumFrom0To15 : (randomNumFrom0To15 & 0x3 | 0x8)
//       return randomHexDigit.toString(16)
//     })
// } 