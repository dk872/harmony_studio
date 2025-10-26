import React from "react";
import { PromiseContainer, PromiseTitle, PromiseList, PromiseItem } from "./OurPromise.styles";

const OurPromise = () => {
    return (
        <PromiseContainer>
            <PromiseTitle>Our Promise to You</PromiseTitle>
            <PromiseList>
                <PromiseItem>
                    Expertise You Can Trust: Our team consists of highly skilled professionals who stay updated with the latest trends and techniques to provide services that exceed your expectations.
                </PromiseItem>
                <PromiseItem>
                    Personalized Experience: We know every client is unique. That’s why we take the time to understand your needs and tailor our services to create the perfect look just for you.
                </PromiseItem>
                <PromiseItem>
                    Commitment to Quality: From the products we use to the care we provide, we focus on delivering exceptional quality at every step of your journey with us.
                </PromiseItem>
                <PromiseItem>
                    Relaxing Atmosphere: Our studio is designed to be a haven of calm where you can escape the stress of daily life and focus on yourself.
                </PromiseItem>
                <PromiseItem>
                    Client-Centric Approach: Your satisfaction is our priority. We value your feedback and continuously strive to improve and innovate.
                </PromiseItem>
            </PromiseList>
        </PromiseContainer>
    );
};

export default OurPromise;
