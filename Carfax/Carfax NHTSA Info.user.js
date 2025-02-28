// ==UserScript==
// @name         Carfax NHTSA Info
// @version      1.1
// @description  Interacts with NHTSA APIs to get and display vehicle information, recalls, complaints, and ratings for cars on Carfax
// @author       \\mxtcha
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @match        https://www.carfax.com/vehicle/*
// @grant        GM_addStyle
// @grant        GM.getValue
// ==/UserScript==
/* global $ */

(function() {
    'use strict';
    let vin = document.location.href.split('vehicle/')[1]

    function showToast(message) {
        var toast = document.createElement('div');
        toast.classList.add('toast');
        // toast.innerHTML = message;
        toast.textContent = message;

        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.padding = '10px';
        toast.style.backgroundColor = '#333';
        toast.style.color = '#fff';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = '9999';

        document.body.appendChild(toast);

        setTimeout(function() {
            toast.remove();
        }, 3000);
    }

    async function getInfoByVin(vin) {
        try {
            let response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`);
            if (response.ok) {
                let vehicleInfo = await response.json();
                sessionStorage.setItem(`${vin}.json`, JSON.stringify(vehicleInfo, null, 4));
                return vehicleInfo;
            } else {
                console.error('Error fetching vehicle info:', response.status);
                return null;
            }
        } catch (error) {
            console.error('Error fetching vehicle info:', error);
            return null;
        }
    }

    async function getRecalls(vin = "", vehicleInfo = {}) {
        if (!Object.keys(vehicleInfo).length) {
            let vinData = await getInfoByVin(vin);
            if (vinData) vehicleInfo = vinData.Results[0];
        }

        if (!vehicleInfo) return null;
        vehicleInfo = vehicleInfo.Results[0]
        try {
            let response = await fetch(`https://api.nhtsa.gov/recalls/recallsByVehicle?make=${vehicleInfo.Make}&model=${vehicleInfo.Model}&modelYear=${vehicleInfo.ModelYear}`);
            if (response.ok) {
                let recallData = await response.json();
                sessionStorage.setItem(`${vin}_recalls.json`, JSON.stringify(recallData, null, 4));
                console.log(recallData)
                return recallData;
            } else {
                console.error('Error fetching recalls:', response.status);
                return null;
            }
        } catch (error) {
            console.error('Error fetching recalls:', error);
            return null;
        }
    }

    async function getComplaints(vin = "", vehicleInfo = {}) {
        if (!Object.keys(vehicleInfo).length) {
            let vinData = await getInfoByVin(vin);
            if (vinData) vehicleInfo = vinData.Results[0];
        }

        if (!vehicleInfo) return null;
        vehicleInfo = vehicleInfo.Results[0]
        try {
            let response = await fetch(`https://api.nhtsa.gov/complaints/complaintsByVehicle?make=${vehicleInfo.Make}&model=${vehicleInfo.Model}&modelYear=${vehicleInfo.ModelYear}`);
            if (response.ok) {
                let complaintData = await response.json();
                sessionStorage.setItem(`${vin}_complaints.json`, JSON.stringify(complaintData, null, 4));
                return complaintData;
            } else {
                console.error('Error fetching complaints:', response.status);
                return null;
            }
        } catch (error) {
            console.error('Error fetching complaints:', error);
            return null;
        }
    }

    async function getRatings(vin = "", vehicleInfo = {}) {
        if (!Object.keys(vehicleInfo).length) {
            let vinData = await getInfoByVin(vin);
            if (vinData) vehicleInfo = vinData.Results[0];
        }

        if (!vehicleInfo) return null;
        vehicleInfo = vehicleInfo.Results[0]
        try {
            let response = await fetch(`https://api.nhtsa.gov/SafetyRatings/modelyear/${vehicleInfo.ModelYear}/make/${vehicleInfo.Make}/model/${vehicleInfo.Model}`);
            if (response.ok) {
                let resultsJson = await response.json();
                sessionStorage.setItem(`${vin}_ratings_search_results.json`, JSON.stringify(resultsJson, null, 4));

                let vehicleId;
                if (vehicleInfo.DriveType) {
                    let drivetype = vehicleInfo.DriveType.split('/')[0];
                    let matchingVehicle = resultsJson.Results.find(choice => choice.VehicleDescription.includes(drivetype));
                    vehicleId = matchingVehicle ? matchingVehicle.VehicleId : resultsJson.Results[0].VehicleId;
                } else {
                    vehicleId = resultsJson.Results[0].VehicleId;
                }

                let ratingsResponse = await fetch(`https://api.nhtsa.gov/SafetyRatings/VehicleId/${vehicleId}`);
                if (ratingsResponse.ok) {
                    let ratingsData = await ratingsResponse.json();
                    sessionStorage.setItem(`${vin}_ratings.json`, JSON.stringify(ratingsData, null, 4));
                    return ratingsData;
                } else {
                    console.error('Error fetching ratings:', ratingsResponse.status);
                    return null;
                }
            } else {
                console.error('Error fetching ratings search results:', response.status);
                return null;
            }
        } catch (error) {
            console.error('Error fetching ratings:', error);
            return null;
        }
    }

    async function nhstaUrl(vin = "", vehicleInfo = {}) {
        if (!Object.keys(vehicleInfo).length) {
            let vinData = await getInfoByVin(vin);
            if (vinData) vehicleInfo = vinData.Results[0];
        }

        if (!vehicleInfo) return null;
        vehicleInfo = vehicleInfo.Results[0]
        sessionStorage.setItem(`${vin}_NHSTA_url.txt`, `https://www.nhtsa.gov/vehicle/${vehicleInfo.ModelYear}/${vehicleInfo.Make}/${vehicleInfo.Model}`)
        return `https://www.nhtsa.gov/vehicle/${vehicleInfo.ModelYear}/${vehicleInfo.Make}/${vehicleInfo.Model}`;
    }

    getInfoByVin(vin).then(vehicleInfo =>{
        getRecalls(vin, vehicleInfo);
        getComplaints(vin, vehicleInfo);
        getRatings(vin, vehicleInfo);
        nhstaUrl(vin, vehicleInfo);
    })

    function addPanel(node) {
        let panelClone = node.cloneNode(true);
        // panelClone.style.border = '2px solid red';
        panelClone.classList.add('cloned-panel');
        panelClone.getElementsByClassName('vehicle-details-module__title')[0].textContent = "NHSTA Information";

        let recallsDiv = panelClone.getElementsByClassName('vehicle-highlights__top-features')[0];
        recallsDiv.classList.add('NHSTA-information__recalls')
        recallsDiv.previousSibling.remove()
        while(recallsDiv.nextSibling){
          recallsDiv.nextSibling.remove()
        }
        let recallsList = recallsDiv.getElementsByClassName('feature-list')[0];
        let flexButton = recallsDiv.getElementsByClassName('button--expandable-content')[0];
        flexButton.remove()

        while(recallsList.firstChild){
          recallsList.removeChild(recallsList.firstChild)
        }
        recallsList.classList = []

        let vehicleRecalls = JSON.parse(sessionStorage.getItem(`${vin}_recalls.json`));
        let infoLink = document.createElement("a")
        infoLink.href = sessionStorage.getItem(`${vin}_NHSTA_url.txt`)
        infoLink.textContent = sessionStorage.getItem(`${vin}_NHSTA_url.txt`)
        infoLink.setAttribute("target", "_blank")
        recallsDiv.parentNode.appendChild(infoLink)
        recallsDiv.firstChild.textContent = `Recalls (${vehicleRecalls.Count})`;

        let recallComponents = []
        let recallIds = []
        for(let recall of vehicleRecalls.results){
          recallComponents.push(recall.Component)
          recallIds.push(recall.NHTSACampaignNumber)
        }

        for(let i in recallComponents){
          let li = document.createElement("li");
          li.innerHTML = `<a href="https://www.nhtsa.gov/?nhtsaId=${recallIds[i]}" target="_blank">${recallComponents[i]}</a>`;
          recallsList.appendChild(li);
        }
        node.after(panelClone);
    }

    // Use MutationObserver to keep the panel
    function observeChanges() {
        const targetNode = document.body;
        const config = { childList: true, subtree: true };

        const callback = function(mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    let originInfoPanel = document.getElementsByClassName('vehicle-highlights')[0];
                    if (originInfoPanel && !document.querySelector('.cloned-panel')) {
                        addPanel(originInfoPanel);
                    }
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }

    observeChanges();
})();
