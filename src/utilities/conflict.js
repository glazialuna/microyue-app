import datas from './cs-courses.json';
// Return true if conflict, if the time is strictly no overlap count as no conflict
const conflict = (course1, course2) => {
    const meet1 = course1.meets.split(" ")[0];
    const meet2 = course2.meets.split(" ")[0];
    const regexp = /M|F|(Th)|W|Tu/g;
    
    const meet1Days = Array.from(meet1.matchAll(regexp), (m) => m[0]);
    const meet2Days = Array.from(meet2.matchAll(regexp), (m) => m[0]);
    // noconflict = true, if no same day
    const noconflict = meet1Days.every(x => !meet2Days.includes(x));

    if (!noconflict){
        const end1time = parseFloat(course1.meets.split(/,| |:|-/)[3]+"."+course1.meets.split(/,| |:|-/)[4]);
        const start1time = parseFloat(course1.meets.split(/,| |:|-/)[3]+"."+course1.meets.split(/,| |:|-/)[4]);
        const end2time = parseFloat(course2.meets.split(/,| |:|-/)[3]+"."+course2.meets.split(/,| |:|-/)[4]);
        const start2time = parseFloat(course2.meets.split(/,| |:|-/)[1]+"."+course2.meets.split(/,| |:|-/)[2]);
        if (end1time>start2time && end1time<=end2time){
            return true;
        }
        if (start1time>=start2time && start1time<end2time){
            return true;
        }
    }
    return false;
  }

  const Noconflictfromlist = (course, courselistkey) =>{
    return courselistkey.every(c => !conflict(datas.courses[c], course));
  }


  export default Noconflictfromlist;