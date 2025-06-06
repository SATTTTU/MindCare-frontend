import ChatBot from "@/modules/user/homepage/component/chatbot"
import Header from "@/modules/user/homepage/component/header"
import HeroSection from "@/modules/user/homepage/component/herosection"

export const HomePageRoute = () => {
    return(
        <><Header/>
        <HeroSection/>
        <ChatBot/>
        </>
        
    )
}