// Code here
function returnBeers() {
    return fetch("http://localhost:3000/beers")
        .then(resp => resp.json())
        .then(json => renderBeers(json))
        .catch(err => console.log('Request Failed', err)); // Catch errors


}


function renderBeers(beers) {
    const beerList = document.querySelector('#beer-list');


    beers.map(function(beer) {
        let li = document.createElement('li');
        li.innerHTML = `${beer.name}`;
        beerList.appendChild(li);
    });


}

function fetchBeerOne() {
    return fetch("http://localhost:3000/beers/1")
        .then(resp => resp.json())
        .then(data => {
            const beerReviews = document.querySelector('#review-list');
            const beerName = document.querySelector('#beer-name');
            const beerImage = document.querySelector('#beer-image');
            const beerDescription = document.querySelector("#beer-description");

            beerName.innerText = data.name;

            // console.log(data.image_url);
            beerImage.src = data.image_url;

            beerDescription.innerText = data.description;

            let reviews = data.reviews;
            // console.log(reviews);
            // postReview(reviews);


            for (let i = 0; i < reviews.length; i++) {
                let li = document.createElement('li');
                li.innerHTML += reviews[i];
                beerReviews.appendChild(li);
            }

        })
        .catch(err => console.log('Request Failed', err)); // Catch errors

}

function editDescription() {
    let updatingForm = document.getElementById("description-form");
    updatingForm.addEventListener("submit", function(e) {
        e.preventDefault();
        let beerEdited = document.getElementById("description").value;
        // console.log(beerEdited);

        fetch("http://localhost:3000/beers/1", {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description: beerEdited })
        })

        location.reload();
    })
}


document.addEventListener("DOMContentLoaded", () => {
    editDescription();
    returnBeers();
    fetchBeerOne();

});