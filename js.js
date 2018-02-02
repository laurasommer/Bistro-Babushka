 let menukort = [];

 document.addEventListener("DOMContentLoaded", hentJson);

 async function hentJson() {
     let jsonData = await fetch("menu.json");
     menukort = await jsonData.json();
     visMenukort(menukort, "Menu");
     lavFiltre();
 }


 function visMenukort(menukort, overskrift) {
     let temp = document.querySelector("[data-menutemplate]");
     let dest = document.querySelector("[data-menukort]");
     dest.innerHTML = "";
     document.querySelector("#overskrift").textContent = overskrift;


     menukort.forEach(madret => {
         //klon template og indsæt person
         let klon = temp.cloneNode(true).content;
         klon.querySelector("[data-navn]").textContent = madret.navn;
         klon.querySelector("[data-kortbeskrivelse]").textContent = madret.kortbeskrivelse;
         klon.querySelector("[data-pris]").textContent = "Pris: " + madret.pris + " kr.";


         klon.querySelector("[data-billede]").setAttribute("src", "imgs/small/" + madret.billede + "-sm.jpg");
         klon.querySelector("[data-billede]").alt = "billede af " + madret.navn;
         dest.appendChild(klon);
     });
 }

 function lavFiltre() {
     let forretter = menukort.filter(madret => madret.kategori == "forretter");
     let hovedretter = menukort.filter(madret => madret.kategori == "hovedretter");
     let desserter = menukort.filter(madret => madret.kategori == "desserter");
     let drikkevarer = menukort.filter(madret => madret.kategori == "drikkevarer");


     //kald visRetter med de nye arrays

     document.querySelector("#filter-alle").addEventListener("click", () => {
         visMenukort(menukort, "Menu");
     });
     document.querySelector("#filter-forretter").addEventListener("click", () => {
         visMenukort(forretter, "Forretter");
     });
     document.querySelector("#filter-hovedretter").addEventListener("click", () => {
         visMenukort(hovedretter, "Hovedretter");
     });
     document.querySelector("#filter-desserter").addEventListener("click", () => {
         visMenukort(desserter, "Desserter");
     });
     document.querySelector("#filter-drikkevarer").addEventListener("click", () => {
         visMenukort(drikkevarer, "Drikkevarer");
     });
 }
