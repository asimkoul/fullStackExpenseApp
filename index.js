async function handleFormSubmit(event){
    event.preventDefault();
    const expenseDetails = {
        amount:event.target.amount.value,
        description:event.target.description.value,
        category:event.target.category.value
    }
    try{
        const response = await axios.post(`http://localhost:3000/expense`,expenseDetails)
        display(response.data);
        //event.target.reset();
    }catch(error) {
        console.log(error)
    }
}
document.addEventListener('DOMContentLoaded',async ()=>{
    try {
        const response=await axios.get(`http://localhost:3000/expense`)
        response.data.forEach(result => {
            display(result)
        });
    } catch (error) {
        
    }
})
function display(data) {
    const ul=document.querySelector('ul')
    const li= document.createElement('li')
    li.appendChild(document.createTextNode(
        `${data.amount} - ${data.description} - ${data.category} `
    ))

    const deleteBtn=document.createElement('button')
    deleteBtn.appendChild(document.createTextNode('DELETE'));
    deleteBtn.setAttribute('id', data.id)
    li.appendChild(deleteBtn)

    const editBtn = document.createElement('button');
    editBtn.appendChild(document.createTextNode('EDIT'));
    editBtn.setAttribute('id', data.id)
    li.appendChild(editBtn)

    ul.appendChild(li)

    deleteBtn.addEventListener('click', () => {
        const id = deleteBtn.getAttribute("id");
        axios.delete(`http://localhost:3000/expense/${id}`)
        .then(res => {
            ul.removeChild(li)
        })
        .catch((error) => {
            console.log(error)
        })

    });
    editBtn.addEventListener('click',async ()=>{
        const id = editBtn.getAttribute("id");
        try {
            const response=await axios.get(`http://localhost:3000/expense/${id}`)
            const deleted=await axios.delete(`http://localhost:3000/expense/${id}`)
            ul.removeChild(li)

                const expense = response.data;
                
                document.getElementById('amount').value = expense.amount;
                document.getElementById('description').value = expense.description;
                document.getElementById('category').value = expense.category;
            
        } catch (error) {
            console.log(error)
        }
    });

}