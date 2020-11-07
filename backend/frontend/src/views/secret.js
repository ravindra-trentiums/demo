import React, { useEffect, useState, memo } from "react";
import { useHistory } from "react-router-dom";
import { postData } from "../context/Common";
import { ToastMessage } from '../context/ToastMessage';

const Secret = memo(() => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory()

    const handleLogout = () => {
        localStorage.clear('token')
        history.push('/')
    }

    const handleEdit = (data) => {
        console.log(data)
        history.push({
            pathname: '/editUser',
            state: { userID: data.userID }
        })
    }

    const handleDelete = (data) => {
        console.log(data)
        setLoading(true);
        postData("/user", data, {
            method_type: "delete",
        }).then((data) => {
            ToastMessage(data.data.message, "s");
            setLoading(false);
            window.location.reload()
        }).catch((error) => {
            ToastMessage(error.data.error, "e");
            setLoading(false);
            history.push('/secret')
        })
    }
    useEffect(() => {
        postData("/user", "", {
            method_type: "get",
        }).then((todo) => {
            console.log(todo.data.user)
            setList(todo.data.user)
        })
    }, [])

    return (<div>
        {console.log(list)}
        <h1>Secret Page</h1>
        <button onClick={() => handleLogout()}>Logout</button>
        <table >
            <ul>
                <tr>
                    <th>userID</th>
                    <th>Name</th>
                    <th>email</th>
                    <th>mobile</th>
                </tr>
                {list && list.map((tdd, i) => <>
                    <tr>
                        <td key={i}>{tdd.userID}</td>
                        <td key={i}>{tdd.fullName}</td>
                        <td key={i}>{tdd.email}</td>
                        <td key={i}>{tdd.mobile}</td>

                        <td><button onClick={() => handleEdit(tdd)}>{/*{loading ?
                            <img className="lazyloaded" src={refresh} width="20" style={{ marginTop: -3 }} alt='' />
                            : null}
                            {loading ? `${'\t'}Loading...` : 'edit'} */}edit</button></td>
                        <td><button onClick={() => handleDelete(tdd)}>delete</button></td>
                    </tr>
                </>
                )}
            </ul>
        </table>
    </div>

        //  <div className="container">
        //     <div className="position-relative pb-5">
        //         <div className="row mt-5">
        //             <div className="right-block-inner">
        //                 <a id="lession10">
        //                     <h1 className="course-title">
        //                         Success <span className="yl-botbod">Stories</span>
        //                     </h1>
        //                 </a>
        //             </div>
        //             <div className="row ">
        //                 {user && user.length > 0 &&
        //                     user.map((review) => {
        //                         let student = {
        //                             name: review.User.Student.name,
        //                             profileImage: review.User.Student.profileImage,
        //                             companyImage: review.User.Student.organizationImage,
        //                             linkdin: review.User.Student.linkedinUrl,
        //                             coruseName: review.Course && review.Course.name,
        //                             decription: review.reviewText,
        //                             rating: review.ratingNumber,
        //                             tags: review.Course && review.Course.CourseTags && review.Course.CourseTags.length > 0 && review.Course.CourseTags,
        //                             link: "",
        //                         };

        //                         return (
        //                             <div className="col-md-4 mb-3" key={`StudentReview${review.userReviewsId}`}>
        //                             </div>
        //                         );
        //                     })}
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );

})
export default Secret