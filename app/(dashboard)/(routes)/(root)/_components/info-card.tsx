import { IconBadge } from '@/components/icon-badge'
import { LucideIcon } from 'lucide-react';
interface InfoCardProps{
    numberOfItems:number;
    variant?:"default"|"success";
    label:string;
    icon:LucideIcon;
}

const InfoCard = ({numberOfItems,variant,icon:Icon,label}:InfoCardProps) => {
  return (
    <div className='border rounded-md flex items-center gap-x-2 p-3'>
      <IconBadge variant={variant} icon={Icon}/>
      <div>
        <p>
            {label}
        </p>
        <p>
            {numberOfItems} {numberOfItems===1?"Course":"Courses"}
        </p>
      </div>
    </div>
  )
}

export default InfoCard
