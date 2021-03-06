$('#search').click(()=>{
    const input = document.getElementById('input').value;
    showRepos(input);
    return false;
})


function showRepos(input){
    const loader = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
    $('#results').html(loader);

    const request = new XMLHttpRequest();
    const requestGet = 'https://api.github.com/orgs/'+input+'/repos?type\=public\&per_page\=50'
    request.open('GET', requestGet, true);

    request.onload = function() {
        const data = JSON.parse(this.response);
        $.each(data, function(i, status){
            if (status =='Not Found'){
                $('#results').html("<h4>Organização não encontrada</h4>");
                return false;
            }
            else{
                let content = '';
                $.each(data, function(i, status){
                    let description = status.description
                    if (description==null){
                        description = 'Sem descrição';
                    };
                    content += `<a target="_blank" href="${status.html_url}">
                        <div class="repository">
                            <div class="repo-info">
                                <h2>${status.name}</h2>
                                <h3>${status.owner.login} - ${i+1} </h3>
                            </div>
                            <div class="repo-desc">
                                ${description}
                            </div>
                        </div>
                    </a>\n`
                });

                $('#results').html(content);
            }

            });
    }

    request.send();
}
