const fetchAllPets = () =>{
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then(response => response.json())
    .then((data) => displayPet(data.pets))
    .catch((error) => console.log(error));
}


let allPets = [];


const fetchPetByID = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pet/pet-id")
    .then(response => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

const fetchPetCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then(response => response.json())
    .then((data) => {
        if (data.categories && data.categories.length > 0) {
            displayCategories(data.categories);
        } else {
            console.log("No categories found.");
        }
    })
    .catch((error) => console.log("Error fetching categories:", error));
};


const removeActiveClass = () =>{
    const buttons = document.getElementsByClassName("category-btn");
    console.log(buttons);
    for (let btn of buttons){
        btn.classList.remove("active");
    }
};

const loadCategoriesPet = (id) => {

    const spinner = document.getElementById("loadingSpinner");
    const petContainer = document.getElementById("pets"); 

    spinner.style.display = "block";  
    petContainer.innerHTML = "";  

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then(response => response.json())
    .then((data) => {
        //active class remove
        removeActiveClass();

        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add('active');
            setTimeout(() => {
                displayPet(data.data);  
                spinner.style.display = "none";  
            }, 1000);
    }
    )
    .catch((error) => console.log(error))
    
};

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
    categoryContainer.innerHTML = "";
    categories.forEach((item) => {
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
        <button id="btn-${item.category}" onclick ="loadCategoriesPet('${item.category}')" class="btn category-btn w-full gap-2 mx-2 p-6 ">
            <img class="w-8" src="${item.category_icon}" alt="${item.pet_name}"> ${item.category}   
        </button>
        `;
        categoryContainer.append(buttonContainer);
    });
};

const loadDetails = async(category) => {
    console.log(category);

    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${category}`;
    const res = await fetch(uri)
    const data = await res.json()
    displayDetails(data.petData)
    console.log(data)
    };

const displayDetails = (pet) => {
    console.log(pet);
    const detailsContainer = document.getElementById("modal-content");
  detailsContainer.innerHTML = `
  <img class="w-full rounded-lg" src=${pet.image} />
  <h2 class="text-2xl font-bold">${pet.pet_name}</h2>
            <div class="grid grid-cols-2">
               <p><i class="fa-solid fa-table-cells-large"></i> Breed: ${pet.breed}</p>
                <p><i class="fa-regular fa-calendar"></i> Birth: ${pet.date_of_birth}</p>
                <p><i class="fa-solid fa-mercury"></i> Gender: ${pet.gender}</p>
                <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price}</p>
                <p><i class="fa-solid fa-mercury"></i> Vaccinated Status: ${pet.vaccinated_status}</p>
            </div>
            <div>
             <h2 class="text-2xl font-bold pt-6">Details Information</h2>
            <p>${pet.pet_details}</p>
            </div>
  `
    document.getElementById("showModalData").click();
    // setTimeout(function() {
    //     document.getElementById("showModalData").click();
    // }, 2000); // 2000ms (2 seconds)
    
}


const adoptDetails = (petId) => {
    console.log(petId);

    const adoptContainer = document.getElementById("adopt-content");
    adoptContainer.innerHTML = `
       <div class="w-full"> <img class="w-[50px] justify-center items-center mx-auto " src="/images/deal.png"/> </div>
        <h2 class="text-2xl font-bold text-center">Congratulations!</h2>
        <p class=" text-center">Adoption is successful!</p>
        <p class="text-center">Thank you for adopting a pet!</p>
        <p id="countdown" class="font-extrabold text-4xl text-center">Adopting in 3...</p>
    `;

    // Select the adopt button
    const adoptButton = document.querySelector(`button[onclick="adoptDetails('${petId}')"]`);
    
    if (!adoptButton) return; 

    let countdown = 4; 
    adoptButton.disabled = true; 

    // Show the modal
    const modal = document.getElementById("customAdoptModal");
    modal.showModal(); 
    // Update countdown display
    const countdownElement = document.getElementById("countdown");

    const interval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            countdownElement.innerText = `Adopting in ${countdown}...`;
        } else {
            clearInterval(interval);
            adoptButton.textContent = "Adopted"; 
            adoptButton.style.backgroundColor = "gray"; 
            adoptButton.style.cursor = "not-allowed"; 
            countdownElement.innerText = "Adoption Successful!"; 
            setTimeout(() => {
                closeModal(); 
            }, 1000); 
        }
    }, 1000); 
};

// Function to close the modal
const closeModal = () => {
    const modal = document.getElementById("customAdoptModal");
    modal.close(); 
};



const displayPet = (pets) => {
    allPets = pets;
    const petContainer = document.getElementById('pets');
    petContainer.innerHTML = "";

    if(pets.length==0){
        petContainer.classList.remove("grid");
        petContainer.innerHTML = `
        <div class="text-center mx-auto text-2xl text-gray-600 mt-10 justify-center items-center flex flex-col ">
        <img class=" mx-auto" src ="/images/error.webp"/>
        <h1 class="text-4xl text-black font-bold ">No Information Available.</h1>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
        
        `;
        return;
    }else{
        petContainer.classList.add("grid");
    }
    pets.forEach(pet => {
        // console.log(pet);
        const card = document.createElement("div");
        card.classList = "card card-compact bg-base-100 shadow-sm p-4 ";
        card.innerHTML = `
        <figure class ="h-[300px]">
            <img 
                src=${pet.image}
                class = "h-full w-full object-cover rounded-md "
                alt="pets image not loading!!" />
        </figure>
        <div class="px-0 py-4">
            <h2 class="card-title">${pet.pet_name}</h2>
            <div>
                <p><i class="fa-solid fa-table-cells-large"></i> Breed: ${pet.breed}</p>
                <p><i class="fa-regular fa-calendar"></i> Birth: ${pet.date_of_birth}</p>
                <p><i class="fa-solid fa-mercury"></i> Gender: ${pet.gender}</p>
                <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price}</p>
            </div>
            <div class="card-actions justify-between">
                <button onclick="likePet('${pet.image}')" class="btn h-[38px] w-[56px]"><i class="fa-solid fa-thumbs-up"></i></button>
                <button onclick="adoptDetails('${pet.pet_name}')" class="btn">Adopt</button>
                <button onclick ="loadDetails('${pet.petId}')" class="btn">Details</button>
            </div>
        </div>
        `;
        petContainer.append(card);
    });
};


// Function to like a pet
const likePet = (petImage) => {
    const likedPetsContainer = document.getElementById("likedPetsContainer");

    // Create a new image element for the liked pet
    const imgElement = document.createElement("img");
    imgElement.src = petImage;
    imgElement.alt = "Liked Pet";
    imgElement.style.width = "100%"; 
    imgElement.style.borderRadius = "5px"; 

   
    likedPetsContainer.appendChild(imgElement);
};


// Function to sort pets by price
const sortPetsByPrice = () => {
    const sortOption = document.getElementById("sortOptions").value;
    let sortedPets;
    if (sortOption === "low-to-high") {
        sortedPets = [...allPets].sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-to-low") {
        sortedPets = [...allPets].sort((a, b) => b.price - a.price);
    } else {
        sortedPets = [...allPets]; 
    }
    displayPet(sortedPets); 
};


fetchPetByID();
fetchPetCategories();
fetchAllPets();

