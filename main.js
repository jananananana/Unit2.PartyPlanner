document.addEventListener("DOMContentLoaded", () => {

const api = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2408-FTB-MT-WEB-PT/events";

const getEvents = async () => { 
    try {
        const response = await fetch(api);
        const events = await response.json();
        populateEvents(events.data);
        return events;
    } catch (error) {
        console.error(error);
    }
}

const createEvent = async (event) => {
    try {
        const response = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
        });
        const newEvent = await response.json();
        addOneEvent(newEvent.data);
        return newEvent;
    } catch (error) {
        console.error(error);
    }
}

const getFormData = (e) => {
    e.preventDefault();
    const name = document.querySelector("#partyName").value;
    const description = document.querySelector("#partyDescription").value;
    const date = new Date(document.querySelector("#partyDate").value);
    const location = document.querySelector("#partyLocation").value;

    const newEvent = {
        name,
        description,
        date,
        location
    }
    createEvent(newEvent);
}

const addOneEvent = (party) => {
    const partyList = document.querySelector("#partyList");
        const template = document.querySelector("#party");
        const clone = template.content.cloneNode(true);
        
        let h2 = clone.querySelector("h2");
        let p = clone.querySelectorAll("p");
        let button = clone.querySelector("button");

        if (party) {
            h2.textContent = party.name;
            p[0].textContent = party.description;
            p[1].textContent = `Date: $${party.date}`;
            p[2].textContent = `Location: ${party.location}`;
            button.setAttribute("data-id", `${party.id}`);
        }

        partyList.appendChild(clone);
}

const deleteEvent = async (id, li) => {
    try {
        const response = await fetch(`${api}/${id}`, {
            method: "DELETE"
        });
        li.remove();
        return response;
    } catch (error) {
        console.error(error);
    }
}

const populateEvents = (parties) => {
    parties.forEach((party) => addOneEvent(party));

}

getEvents();
document.querySelector("#partyFormSubmit").addEventListener("click", getFormData);
document.querySelector("#partyList").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const li = e.target.closest("li");
        const id = e.target.getAttribute("data-id");
        deleteEvent(id, li);
    }
});


});