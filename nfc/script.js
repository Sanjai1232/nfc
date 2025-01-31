// Bike Data (stored NFC data)
const bikeData = {
    "101": { 
        name: "Speedster 2000", 
        owner: "John Doe", 
        contact: "123-456-7890", 
        image: "images/bike1.jpg"
    },
    "102": { 
        name: "Mountain King", 
        owner: "Jane Smith", 
        contact: "987-654-3210", 
        image: "images/bike2.jpg"
    },
    "103": { 
        name: "City Rider", 
        owner: "Emily Brown", 
        contact: "456-789-1230", 
        image: "images/bike3.jpg"
    }
};

// Select elements
const scanNfcButton = document.getElementById('scanNfcButton');
const nfcStatus = document.getElementById('nfcStatus');
const nfcPrompt = document.getElementById('nfcPrompt');
const appContainer = document.getElementById('appContainer');
const bikeImage = document.getElementById('bikeImage');
const bikeName = document.getElementById('bikeName');
const ownerName = document.getElementById('ownerName');
const contactInfo = document.getElementById('contactInfo');

// Function to start NFC scan
async function scanNFC() {
    if ("NDEFReader" in window) {
        try {
            const ndef = new NDEFReader();
            await ndef.scan();
            nfcStatus.textContent = "Scanning for NFC Tag...";
            
            ndef.onreading = (event) => {
                const decoder = new TextDecoder();
                const bikeId = decoder.decode(event.message.records[0].data);
                
                if (bikeData[bikeId]) {
                    displayBikeDetails(bikeId);
                } else {
                    nfcStatus.textContent = "Invalid NFC Tag. Try Again!";
                }
            };
        } catch (error) {
            nfcStatus.textContent = "NFC Scan Failed. Check permissions!";
        }
    } else {
        nfcStatus.textContent = "NFC not supported on this device!";
    }
}

// Function to show bike details after scanning NFC
function displayBikeDetails(bikeId) {
    const bike = bikeData[bikeId];

    // Update UI
    bikeImage.src = bike.image;
    bikeName.textContent = bike.name;
    ownerName.textContent = bike.owner;
    contactInfo.textContent = bike.contact;

    // Hide NFC prompt and show app
    nfcPrompt.style.display = "none";
    appContainer.classList.remove('hidden');
}

// Event Listener for NFC Scan Button
scanNfcButton.addEventListener('click', scanNFC);
