import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import * as S from "./styled";

const SetProfile = ({link, item, userInfo}) => {
    const navigate = useNavigate();

    const setUserProfile = () => {
        axios
            .post("/api/profile/set", {
                clientId: userInfo.id,
                image: item,
            })
            .then((res) => {
                navigate("/mypage", {state: {first: false}});
            });
    };

    return <S.ProfileThings onClick={setUserProfile} src={link} key={item}/>;
};

export default SetProfile;
