import React, { memo } from "react";

const Index = memo(() => {
    return (
        <div className="col-md-12 mb-3">
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/signup';
                }}
            >
                signup
          </button>
          <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/login';
                }}
            >
                login
          </button>
        </div>
    )
})

export default Index