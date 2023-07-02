import { useState } from 'react';
import './kalender.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

// import { Calendar } from 'react-date-range';
import { DateRangePicker } from 'react-date-range';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';

function Kalender() {
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 3),
          key: 'selection'
        }
      ]);
// const [tanggal, seTtanggal] = useState()
// const handleTanggal = (tanggal)=>{
//     console.log(tanggal)
// }
const handleTanggal = (tanggal)=>{
    
    console.log(tanggal)
    let durasi = tanggal.endDate-tanggal.startDate
    durasi = durasi/86400
    durasi = durasi/1000
    console.log(durasi)
    console.log(typeof durasi)
    setState([tanggal])

}
  return (
    
    <div className="Kalender">
        {/* <DateRangePicker
            onChange={item => handleTanggal(item.selection)}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={state}
            direction="horizontal"
/> */}

<DateRange
  editableDateInputs={true}
  onChange={item => handleTanggal(item.selection)}
  moveRangeOnFirstSelection={false}
  ranges={state}
/>
    </div>
  );
}

export default Kalender;
