const apiUrl = "https://randomuser.me/api/?";
const listElm = document.getElementById('list');

const userCountElm = document.querySelector('#user-count');


let userArgs = []
const displayUser = (args = userArgs) => {
  let str = '';
  args.map(usr => {

    str += `
                <div class="col-md-6 col-lg-3 py-3">
                  <div class="card" style="width: 100%">
                    <img src="${usr.picture.large}" class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">${usr.name.title} ${usr.name.first} ${usr.name.last} </h5>
                      <p class="card-text">
                        <ul class="list-unstyled">
                        
                            <li>
                            
                            <i class="fa-solid fa-phone pt-2 text-center"></i>${usr.phone}
                            
                            </li>

                            <li><i class="fa-solid fa-envelope pt-2 text-center"></i> ${usr.email}</li>

                            
                            <li><i class="fa-solid fa-calendar-days pt-2 text-center"></i> ${usr.dob.date}</li>
                            <li><i class="fa-solid fa-location-pin pt-2 text-center"></i> ${usr.location.city}</li>
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>
                `

  })
  userCountElm.innerHTML = args.length;
  listElm.innerHTML = str;
}

const fetchUsers = (params = "results=20") => {
  fetch(apiUrl + params).then(response => response.json())
    .then(data => {

      userArgs = data.results;

      displayUser();
    }).catch(err => (listElm.innerHTML = `
            <div class = "alert alert-danger" role="alert"> Oops! Something went wrong... </div>
            `));

}
fetchUsers();

const handleOnChange = e => {
  const value = e.value;
  const params = "results=20&gender=" + value;
  fetchUsers(params)
}

const handleOnSearch = () => {
  const searchStr = document.getElementById('search').value;


  const filteredUser = userArgs.filter(item => {
    const userName = `${item?.name?.first} ${item?.name?.last}`


    if (userName.toLowerCase().includes(searchStr.toLowerCase())) {
      return item;
    }
  })

  displayUser(filteredUser)
}
