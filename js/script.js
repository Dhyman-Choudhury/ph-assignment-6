
document.getElementById('vocabulary_container').classList.add('hidden');

document.getElementById('main_section').classList.add('hidden');
document.getElementById('footer').classList.add('hidden');

document.getElementById('get_started').addEventListener('click', () =>{
    const name = document.getElementById('name').value;
    const code = document.getElementById('code').value;
    if(name === ''){
        alert('Please tell use Your Name first');
    }
    else if(code == 123456 ){
        document.getElementById('banner').classList.add("hidden");
        document.getElementById('main_section').classList.remove('hidden');
        document.getElementById('footer').classList.remove('hidden');
   }
   else{
    alert("Wrong Password. Contact admin to get your Login Code")
   }
})
document.getElementById('logout').addEventListener('click', ()=>{
    document.getElementById('banner').classList.remove("hidden");
    document.getElementById('main_section').classList.add('hidden');
})

const loadButton = async() =>{
    
    const response = await fetch("https://openapi.programming-hero.com/api/levels/all");
    const data = await response.json();
    displayButton(data.data);
}

const displayButton = (types) =>{
    
    types.forEach(element => {
       const selectBtn = document.getElementById('select_btn');
       const div = document.createElement('div');
       div.innerHTML = `
       <button id="btn_${element.level_no}" onclick = "loadVocabulary(${element.level_no})" class="btn btn-outline btn-primary"><img src="./assets/fa-book-open.png" alt=""> Learn - ${element.level_no
       }</button>
       `
       selectBtn.appendChild(div)
    });
}
loadButton()


const loadVocabulary = async (id) =>{
    showLoader();
    
    document.getElementById('vocabulary_container').innerHTML='';
    const response = await fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    const data = await response.json();
    
    removeActiveButton()
    document.getElementById(`btn_${id}`).classList.add("active");
    displayVocabulary(data.data)
}
const displayVocabulary = (vocabularies)=>{
    document.getElementById('select_section').style.display='none';
    document.getElementById('vocabulary_container').classList.remove('hidden');
    if(vocabularies.length == 0 ){
        const vocabularyContainer = document.getElementById('vocabulary_container');
        vocabularyContainer.innerHTML = `
         <div id="select_section" class=" space-y-5 py-20 col-span-3 flex flex-col justify-center items-center text-center mx-auto ">
        <img src="./assets/alert-error.png" alt="" class="mx-auto">
        <p class="text-sm text-[#79716B] text-center">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
        <h3 class="font-bold text-4xl text-center">নেক্সট Lesson এ যান।</h3>
       </div>
        `;
        hideLoader();
        
    }
    vocabularies.forEach(element =>{
        
        const vocabularyContainer = document.getElementById('vocabulary_container');
        if((`${element.meaning}`) == "null"){
           element.meaning = "অর্থ  নেই" 
        }
        const div = document.createElement('div');
        div.innerHTML = `
            <div class=" rounded-xl px-5 py-10 bg-white text-center space-y-3 border-2 border-gray-100 h-[300px] hover:bg-sky-100">
                <h3 class="font-bold text-[32px]">${element.word}</h3>
                <p class="font-medium text-[20px]">Meaning / Pronunciation</p>
                <h3 class="font-semibold text-[32px]">${element.meaning} / ${element.pronunciation}</h3>
                <div class=" flex justify-between">
                    <i onclick="loadVocabDetails(${element.id})" class="fa-solid fa-circle-info"></i>
                     <i class="fa-solid fa-volume-high"></i>
               </div>

            </div>
        `;
        vocabularyContainer.appendChild(div);
        
    });
    hideLoader();
}

loadVocabulary()
const loadVocabDetails = (id) =>{
    document.getElementById('details_container').innerHTML='';
    const url = (`https://openapi.programming-hero.com/api/word/${id}`)
    fetch(url)
    .then( res => res.json())
    .then(data => {
 showVocabDetails(data.data)
 
    })
}
const showVocabDetails = (number) =>{
    if((`${number.meaning}`) == "null"){
           number.meaning = "অর্থ  নেই" 
        }

        if((`${number.synonyms}`) ==[]){
            number.synonyms[0]='';
            number.synonyms[1]='';
            number.synonyms[2]='';

        }
    
     document.getElementById('video_details').showModal();

     const modal = document.getElementById('details_container')
     
    const div = document.createElement('div');
    div.innerHTML=`
    <h3 class="font-semibold text-4xl">${number.word} (<i class="fa-solid fa-microphone-lines"></i> : ${number.pronunciation} )</h3> <br>
    <p class="font-semibold text-[24px]">Meaning</p>
    <p class="font-semibold text-[24px]">${number.meaning}</p> <br> <br>
    <p class="font-semibold text-[24px]">Example</p>
    <p class="text-sm">${number.sentence}</p> <br>
    <h3 class="font-medium text-[24px]">সমার্থক শব্দ গুলো</h3>
    <div id="hide" class="flex gap-5"> 
        <button  class="sn_btn btn bg-[#D7E4EF] ">${number.synonyms[0]}</button>
        <button class="sn_btn btn bg-[#D7E4EF] ">${number.synonyms[1]}</button>
        <button class="sn_btn btn bg-[#D7E4EF] ">${number.synonyms[2]}</button> 
    </div> <br>
   

    `
    modal.append(div);
}

// remove active button function
const removeActiveButton = () =>{
    const removeActive = document.getElementsByClassName('active');
    for(let btn of removeActive){
    btn.classList.remove("active");
    }
}

const showLoader = () =>{
    document.getElementById("loader").classList.remove("hidden")
    
}
const hideLoader = () =>{
    document.getElementById("loader").classList.add("hidden")
    
}


