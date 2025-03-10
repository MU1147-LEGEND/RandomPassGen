import { useState } from "react";

function generateRandomPassword() {
    let pass = "";
    let nums = "0123456789".split("");
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
        ""
    );
    let specialChars = "!@#$%^&*()_+-=[]{}|;:<>?/".split("");
    let randArray = nums.concat(letters).concat(specialChars);
    let RandLength = Math.floor(Math.random() * (18 - 16 + 1)) + 16;

    for (let i = 0; i < RandLength; i++) {
        pass = pass.concat(
            randArray[Math.floor(Math.random() * randArray.length)]
        );
    }
    return pass;
}

const App = () => {
    const [pass, setPass] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [copiedPasses, setCopiedPasses] = useState([]);

    function copyText() {
        if (pass) {
            navigator.clipboard.writeText(pass);
            setIsCopied(true);
            // reset after 3 second.
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
            // store copied passwords temporary.
            setCopiedPasses(new Set([...copiedPasses, pass]));
            return;
        }
        alert("Cannot copy empty value.");
    }

    return (
        <>
            <div className="m-auto block py-4 px-10 text-center">
                <h2 className="text-2xl font-semibold pb-4">
                    Random Password Generator
                </h2>
                <input
                    type="text"
                    id="randPass"
                    value={pass}
                    onChange={(e) => {
                        setPass(e.target.value);
                    }}
                    // readOnly
                    className="border py-1.5 rounded-md border-blue-600 text-blue-700 focus:border-blue-600"
                />
                <button
                    onClick={() => {
                        copyText();
                    }}
                    className="border border-blue-700 font-semibold bg-transparent text-blue-700 px-4 py-2 ml-4 hover:bg-blue-500 hover:text-white transition-colors duration-300 rounded-xl active:scale-95"
                >
                    {isCopied ? (
                        "Copied"
                    ) : (
                        <button>
                            Copy&nbsp;
                            <span className="inline-block -mb-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M16 1H4C2.9 1 2 1.9 2 3v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                                    />
                                </svg>
                            </span>
                        </button>
                    )}
                </button>
                <br />
                <button
                    className="border-2 bg-blue-700 text-white px-8 py-2 mt-8 hover:bg-blue-500 transition-all duration-300 rounded-xl"
                    onClick={() => {
                        setPass(generateRandomPassword());
                        setIsCopied(false);
                    }}
                >
                    Click to Generate ✨🚀
                </button>
                <br />
                <span className="mt-10 block">
                    Password Length: {pass.length}
                </span>
                <br />
                <span>
                    My Copied Passwords: {[...copiedPasses].length}
                </span>{" "}
                <br />
                <ol className="list-decimal inline-block mt-4">
                    {[...copiedPasses].map((passes) => {
                        return <li key={passes}>{passes}</li>;
                    })}

                    {/* {[...copiedPasses].map((pass, index) => (
                        <li key={index}>{pass}</li>
                    ))} */}
                </ol>
            </div>
        </>
    );
};

export default App;
