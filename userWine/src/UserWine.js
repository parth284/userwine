import React,{useEffect, useState}  from "react";
// import {first, second} from "./api/links";
import axios from "axios";

const Users = ()=>{

    const [data, setData] = useState([])
    useEffect(()=>{
        fetchData();
        setInterval(() => {
            fetchData();
        }, 15000);
    },[])

    const fetchData = async () => {

        const mongo = await axios.get('/api');
        setData(mongo.data);
        console.log(mongo);
    }
    

    const render = data.map((datas)=>{

        return(

            <div class="mdl-layout mdl-js-layout mdl-color--grey-100">
                    <main class="mdl-layout__content">
                        <div class="mdl-grid">
                            <div class="mdl-card mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-shadow--2dp">
                                <figure class="mdl-card__media">
                                    <img src={datas.user[0].picture.large} alt="" />
                                </figure>
                                <div class="mdl-card__title">
                                    <p>
                                    <h1 class="mdl-card__title-text">{datas.user[0].id.name}</h1><br></br>
                                    <h3 style={{fontSize:"1.5em"}} class="mdl-card__title-text">Email:{datas.user[0].email}</h3><br></br>
                                    <h3 style={{fontSize:"1.5em"}} class="mdl-card__title-text">UserNmae:{datas.user[0].login.username}</h3><br></br>
                                    <h3 style={{fontSize:"1.5em"}} class="mdl-card__title-text">Password:{datas.user[0].login.password}</h3><br></br>
                                    </p>
                                    
                                    
                                </div>
                            </div>
                            
                            
                            
                            <div class="mdl-card mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-shadow--2dp">
                                <figure class="mdl-card__media">
                                    <img style={{width:200}}src={datas.drinks[0].strDrinkThumb} alt="" />
                                </figure>
                                <div class="mdl-card__title">
                                <h1 class="mdl-card__title-text">{datas.drinks[0].strDrink}</h1>
                                </div>
                                <div style={{fontSize:"1.5em"}} class="mdl-card__supporting-text">
                                    <p>{datas.drinks[0].strInstructions}</p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
        );
    })
    
    if(!data.length){
        return<div>loding...</div>
    }
    
    return(
        <div>
            <div>
                <div class="mdl-color--grey-100" style={{display:"flex"}}>
                    <div style={{padding:"25px 0 20px 300px", fontSize:"30px"}}>User</div>
                    <div style={{padding:"25px 0 20px 800px", fontSize:"30px"}} className="wine ">Wine</div>
                </div>
            </div>
            <div>
                {render}
            </div>
        </div>
    );

        
};

export default Users;