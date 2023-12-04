async function fetchData() {
    try {
        const response = await fetch('http://localhost:1000/todo');
        if (!response) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data from the server:', data);

        // Clear the existing list items
        document.getElementById('todoList').innerHTML = '';

        // Iterate over the data and create list items
        data.forEach(item => {
            let listItem = document.createElement('li');
            listItem.textContent = `${item.title}  : ${item.description}`;
            document.getElementById('todoList').appendChild(listItem);
            let editbutton = document.createElement('button');
            editbutton.textContent = "Edit"
            editbutton.id = "btne"
            editbutton.onclick = function () {
                clickedit(item);
            };
            listItem.appendChild(editbutton)
            let deletebutton = document.createElement('button');
            deletebutton.textContent = "Delete"
            deletebutton.id = "btnd"
            deletebutton.onclick = function () {
                clickdelete(item._id)
            }
            listItem.appendChild(deletebutton)
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

fetchData();
async function createtodo() {
    try {
        let ti = document.getElementById('title').value
        let des = document.getElementById('description').value
        let data = { title: ti, description: des }
        const response = await fetch('http://localhost:1000/todo', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (!response) {
                throw new Error('Network response was not ok');
            }
            const res = response.json();
            console.log(res, "dfsdfs")
            fetchData()
        })
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

async function clickedit(item) {
    try {
        const id = item._id;
        console.log("fsdf", id)

        // Change the button text to "Update"
        document.getElementById('btn').textContent = "update";

        // Populate the input fields with the item data
        document.getElementById('title').value = item.title;
        document.getElementById('description').value = item.description;
        // Add a click event listener to the button for updating
        document.getElementById('btn').onclick = async () => {
            try {
                let ti = document.getElementById('title').value;
                let des = document.getElementById('description').value;
                let data = { title: ti, description: des };

                const response = await fetch(`http://localhost:1000/todo/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (!response) {
                    throw new Error('Network response was not ok');
                }

                const res = await response.json();
                console.log(res, "dfsdfs");
                fetchData();

                // Reset the button text to "Save"
                document.getElementById('btn').textContent = "save";

                // Clear the input fields
                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
            } catch (error) {
                console.error('Error updating data:', error.message);
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}
async function clickdelete(id) {
    let res = await fetch(`http://localhost:1000/todo/${id}`, {
        method: "DELETE",
    }).then((res) => {
        console.log(res, "res")
        fetchData();
    })
}