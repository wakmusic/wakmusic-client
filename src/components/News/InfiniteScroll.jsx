import React, {useState, useEffect} from "react"
import axios from "axios"


const InfiniteScroll = () => {
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(0);
    const [item, setItem] = useState([]);

    const fetchMoreData = async () => {
        setLoading(true);
        await axios.get(`/api/news?start=${start}`)
            .then((response) => {
                const fetchedData = response.data;
                const mergedData = item.concat(...fetchedData);
                setItem(mergedData);
            });
        let next = start + 30;
        setStart(next);
        setLoading(false);
    };

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight + 600 >= scrollHeight && !loading) {
            fetchMoreData().then();
        }
    };

    useEffect(() => {
        if (!loading && start === 0) fetchMoreData().then();
        if (start - 30 > item.length) return;
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    const getItem = () => {
        let news = [];
        let categoryStr = {
            "focus": "이세돌 포커스",
            "wakmusic": "주간 왁뮤차트",
            "etc": "기타"
        }

        item.forEach((i, index) => {
            let category;
            switch (i.time % 10) {
                case 0:
                    category = "focus";
                    break;
                case 1:
                    category = "wakmusic";
                    break;
                default:
                    category = "etc";
            }

            news.push(
                <div className="news-item fadein" key={index}>
                    <a href={`https://cafe.naver.com/steamindiegame/${i.id}`} target="_blank" rel="noreferrer">
                        <img src={`/static/news/${i.time}.png`} alt="" className="news-thumbnail"/>
                        <div className="trapezoid-wrap">
                            <div className="news-trapezoid" id={category}/>
                        </div>
                        <div
                            className={`news-category ${category === "focus" ? "" : "black"}`}>{categoryStr[category]}</div>
                        <div className="news-title">{i.title}</div>
                    </a>
                </div>
            )
        })
        return news;
    }

    if (!item) return <div className="loading"/>;
    return getItem();
}

export default InfiniteScroll;