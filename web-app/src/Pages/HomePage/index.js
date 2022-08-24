import './Styles.css';
import Header from '../../Components/Header';
import axios from 'axios';
import { useState, useEffect } from 'react';


var routes = {
    "/login": "",
    "/signup": "",
    "/user/getfriends/:id": "",
    "/user/getinfo/:id": "",
    "/user/update/:id": "",
    "/user/delete/:id": "",
    "/user/history/:id": ""
}

function HomePage() {

    /*
    const [response1, setResponse1] = useState("");
    const [response2, setResponse2] = useState("");
    const [response3, setResponse3] = useState("");
    const [response4, setResponse4] = useState("");
    const [response5, setResponse5] = useState("");
    const [response6, setResponse6] = useState("");
    const [response7, setResponse7] = useState("");

    useEffect(()=>{
        axios.post("http://localhost:8080/login").then((response)=>{
            setResponse1(response.data);
        })
        axios.post("http://localhost:8080/signup").then((response)=>{
            setResponse2(response.data);
        })
        axios.get("http://localhost:8080/user/getfriends/123").then((response)=>{
            setResponse3(response.data);
        })
        axios.get("http://localhost:8080/user/getinfo/123").then((response)=>{
            setResponse4(response.data);
        })
        axios.post("http://localhost:8080/user/update/123").then((response)=>{
            setResponse5(response.data);
        })
        axios.put("http://localhost:8080/user/delete/123").then((response)=>{
            setResponse6(response.data);
        })
        axios.get("http://localhost:8080/user/history/123").then((response)=>{
            setResponse7(response.data);
        })
    }, []);

    */
   
    return (
        <div className="HomePage">
            <Header/>
            
            <div className='HomeContainer'>
                <header>
                    <div className='HomeBar'>
                        <div className='OptionsBar'>Movies</div>
                        <div className='OptionsBar'>Series</div>
                        <div className='OptionsBar'>Books</div>
                        <div className='OptionsBar'>Community</div>
                        <div className='OptionsBar'>Help</div>
                    </div>
                </header>

                <div className='HomeContent'>

                    <div className='LeftContent'>

                        <article className='WidgetContainer'>
                            <div className='WidgetContainerHeader'>
                                <span className='WidgetContainerTitle'>Recent Discussions</span> 
                                <span className='ViewMore'>View More</span>
                            </div>
                            <div className='WidgetContainerContent'>
                            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                            </div>
                        </article>

                        <article className='WidgetContainer'>
                            <div className='WidgetContainerHeader'>
                                <span className='WidgetContainerTitle'>Latest Reviews</span> 
                                <span className='ViewMore'>View More</span>
                            </div>
                            <div className='WidgetContainerContent'>
                            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
                            </div>
                        </article>

                        <article className='WidgetContainer'>
                            <div className='WidgetContainerHeader'>
                                <span className='WidgetContainerTitle'>Latest Recommendations</span> 
                                <span className='ViewMore'>View More</span>
                            </div>
                            <div className='WidgetContainerContent'>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            </div>
                        </article>

                    </div>

                    <div className='RightContent'>
                        <article>

                        </article>

                        <article>

                        </article>
                    </div>

                </div>
                
            </div>
   
        </div>
    );
}

export default HomePage;
