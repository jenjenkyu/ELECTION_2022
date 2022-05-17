
const president = document.getElementById('president');
const vice = document.getElementById('vice-p');
const senators = document.getElementById('senators');

async function categorize(pre,vices,sena)
{
    appendData(pre,president);
    appendData(vices,vice);
    appendData(sena,senators);
}

function appendData(E,type){

    E.result.forEach(element => {
        const prcnt =(element.voteCount/element.voter.actualCount) * 100;
        const div = document.createElement('div');
        const div1 = document.createElement('div');
        const progress = document.createElement('div');
        const p1 = document.createElement('p');
        const h3 = document.createElement('h3');
        const p2 = document.createElement('p');
        progress.style= 'width:'+prcnt+"%";
        h3.innerText = 'Rank: '+element.rank+" "+prcnt.toFixed(2)+" %";
        p1.innerText = element.candidateName;
        p2.innerText = element.voteCount;
        progress.className='progess';
        div.className = 'card';
        div.appendChild(progress);
        div.appendChild(h3);
        div1.appendChild(p1);
        div1.appendChild(p2);
        div.appendChild(div1);
        type.appendChild(div);
        
    });
}

fetchDatas();
async function fetchDatas(){
    
    const[p,v,s] =  await Promise.all([
        fetch("https://blob-prod-president.abs-cbn.com/feed-196/president-00199000-nation-location-1.json"),
        fetch("https://blob-prod-vice-president.abs-cbn.com/feed-196/vice-president-00299000-nation-location-1.json"),
        fetch("https://blob-prod-senator.abs-cbn.com/feed-196/senator-00399000-nation-location-1.json")
    ]);
    const [president,vice,senators] = await Promise.all([p.json(),v.json(),s.json()]);
    return categorize(president,vice,senators)
}


