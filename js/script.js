const ApiKey = "";
const baseUrl = "https://www.balldontlie.io/api/v1/";
const baseEndPoin = `${baseUrl}/teams/`;
const statsEndPoint = `${baseUrl}/stats`
// const standingEndPoin = `${baseUrl}competitions/${leagueId}/standings`;
// const matchEndPoin = `${baseUrl}competitions/${leagueId}/matches`;

// const detailEndPoin = `${baseUrl}teams/${id}`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchHeader = {
    headers: {
        'X-Auth-Token': ApiKey
    }
};

function getListTeams() {
    title.innerHTML = "Daftar Tim NBA"
    fetch(baseEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data);
            let data = "";
            resJson.data.forEach(team => {
                data += `
                <li class="collection-item avatar">
                    <span class="title"><b>${team.full_name}</b></span>
                    <p>Kota: ${team.city} <br>
                       Divisi: ${team.division} <br>
                       Singgkatan : ${team.abbreviation}
                    </p>
                    <a href="#" data-id=${team.id} class="secondary-content"><i class="material-icons" data-id=${team.id}>info</i></a>
                </li>
                `
            });
            contents.innerHTML = '<ul class="collection">' + data + '</ul>'
        }).catch(err => {
            console.error(err);
        })
}

function getListStats() {
    title.innerHTML = "Statistik"
    fetch(statsEndPoint, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data);
            let data = "";
            resJson.data.forEach(teams => {
                data += `
                <li class="collection-item avatar">
                    <span class="title"><b>${teams.team.full_name}</b></span>
                    <p>Nama: ${teams.player.first_name} ${teams.player.last_name} <br>
                       Posisi: ${teams.player.position} <br>
                       Point : ${teams.pts} <br>
                       Assist: ${teams.ast} <br>
                       Block : ${teams.blk} <br>
                       Dribble : ${teams.dreb}
                    </p>
                    <a href="#" data-id=${teams.player.id} class="secondary-content"><i class="material-icons" data-id=${teams.player.id}>info</i></a>
                </li>
                `
            });
            contents.innerHTML = '<ul class="collection">' + data + '</ul>'
        }).catch(err => {
            console.error(err);
        })
}


function loadPage(page) {
    switch (page) {
        case "teams":
            getListTeams();
            break;
        case "stats":
            getListStats();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
    });