import './Contacts.css'
import React from "react";

class Contacts extends React.Component {
    contactClicked(index) {
        this.props.selectContactHandler(index);
    }

    render() {
        return (
            <div className="contacts">
                {this.props.contacts.map((contact, index) => (
                    <div className={"contact"}
                        key={index}
                        onClick={() => this.contactClicked(index)}
                    >
                        <div className={(index === this.props.selected ? "selected " : '') + "contact"}>
                            {contact}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Contacts;