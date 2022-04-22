import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";

function UserEditImg(props) {
    const navigate = useNavigate();
    const [file, setFile] = useState();

    const [load, setLoad] = useState(false);

    let token = useSelector((state) => state.data.datas.token);
    let user = token === "" ? "" : jwt_decode(token);

    useEffect(() => {
        if (token === "") {
            navigate('/');
        }
    }, [])

    function changeHandler(e) {
        props.file(e);
        setFile(e);
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: `image/jpg, image/png, image/jpeg`,
        onDrop: acceptFiles => {
            console.log(acceptFiles[0]);
            changeHandler(acceptFiles[0]);
        }
    })

    function submitHandler(e) {
        e.preventDefault();

        if (file === undefined) {
            return;
        }

        const cek = window.confirm("If you save your profile, the previous data will be replace, Are you sure?")
        
        if (!cek) {
            return;
        }

        const formData = new FormData();
        // console.log(file);
        formData.append('file', file);
        formData.append('email', user.email);
        
        setLoad(true);

        axios.post("http://localhost:5000/updateUser", formData)
        .then(res => {
            setLoad(false);
            alert("Upload Succeed");
        })
    }

    return (
        <React.Fragment>
            <div className='grid grid-cols-1 place-content-center text-center'>
                <div {...getRootProps({ className: 'dropzone' })} className="col-span-1">
                    <label htmlFor="image" className="block text-sm font-semibold">
                        Upload Your File
                    </label>
                    <div className='flex mt-1 justify-center px-6 pt-5 pb-6 border-2 border-base-content border-dashed rounded-md'>
                        <input {...getInputProps()} className="sr-only" />
                        <div className="space-y-1 text-center">
                            <svg
                                className="mx-auto h-12 w-12"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div className="flex text-sm">
                                <p className="pl-1">Upload a file or drag and drop</p>
                            </div>
                                <p className="text-xs">PNG, JPG, and JPEG</p>
                            </div>
                        </div>
                    </div>
                <div className='col-span-1'>
                    <center>
                        {load ? (
                            <button className="flex mt-4 gap-2 bg-indigo-500 text-white font-bold py-2 px-4 rounded">
                                <svg className='animate-spin text-white w-5 h-5' xmlns='http://www.w3.org/2000/svg' fill="none" viewBox='0 0 24 24'>
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </button>
                        ) : (
                            <button className="flex mt-4 gap-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type='submit' onClick={submitHandler}>Save</button>
                        )}
                    </center>
                </div>
            </div>

        </React.Fragment>
    );
    
}

export default UserEditImg;