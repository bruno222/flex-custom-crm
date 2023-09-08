import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();

  const screenPop = (data: any) => {
    //if we have the contact ID pop it
    if (data.taskAttributes.dealId) {
      //nav to contact
      console.log("crm: navigating to contact");
      navigate(`deals/${data.taskAttributes.dealId}/show`);
    } else if (data.taskAttributes.contactId) {
      //nav to contact
      console.log("crm: navigating to contact");
      navigate(`contacts/${data.taskAttributes.contactId}/show`);
    }
    else {
      //new contact
      navigate(`/contacts/create`);
    }
  }

  useEffect(() => {
    window.addEventListener("message", function (event) {
      try {
        const data = JSON.parse(event.data);
        if (data.flexEventType) {
          console.log("Message received from Flex: ", data); // Message received from child

          switch(data.flexEventType){
            case "SelectTask": screenPop(data);
          }
        }
      } catch (error: any) {
        console.error("Error when receiving message from child frame.", error);
      }
    });
  }, []);

  return <></>;
};
