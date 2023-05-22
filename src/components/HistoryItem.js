import { format } from 'date-fns'


const HistoryItem = (props) => {

  const date = new Date(props.order.datetime); 
   
  return (
    <div >
      <span>№ {props.order.order_id}</span>
      <span>{props.order.name}</span>
      <span>{props.order.capacity} мл</span> 
      <span>{format(date, 'dd.mm.yyyy')}</span>
    </div>
  )
}

export { HistoryItem } 