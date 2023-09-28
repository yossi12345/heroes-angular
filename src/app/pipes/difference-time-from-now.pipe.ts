import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'differenceTimeFromNow'
})
export class DifferenceTimeFromNowPipe implements PipeTransform {
  transform(value?:Date|null):string{
    if (!value)
      return ""
    const timeDifferenceInMiliseconds=value.getTime()-(new Date().getTime())
    const timeDifferenceInSeconds=Math.floor(timeDifferenceInMiliseconds/1000)
    const hours=Math.floor(timeDifferenceInSeconds/3600)
    const minutes=Math.floor((timeDifferenceInSeconds%3600)/60)
    const seconds=timeDifferenceInSeconds%60
    return (hours<10?"0":"")+hours+":"+(minutes<10?"0":"")+minutes+":"+(seconds<10?"0":"")+seconds
  }
}
