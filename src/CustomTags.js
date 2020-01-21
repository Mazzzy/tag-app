import React, {useState, useEffect} from "react"
import {getWhitelistFromServer, getValue} from "./mock-server"

import Tags from "@yaireo/tagify/dist/react.tagify";

window.addHandler = function(e) {
    alert('Clicked ', e)
}
// import Tags from "@yaireo/tagify"

/////////////////////////////////////////////////

// Tagify settings object
const baseTagifySettings = {
  blacklist: ["xxx", "yyy", "zzz"],
  maxTags: 6,
  backspace: "edit",
  placeholder: "type something",
  dropdown: {
    enabled: 0 // a;ways show suggestions dropdown
  }
}


// this example callback is used for all Tagify events
const callback = e =>
  console.log(`%c ${e.type}: `, "background:#222; color:#bada55", e.detail)

const addCallback = e => {
  console.log('EE ', e.target)
  console.log(`%c ${e.type}: `, "background:#222; color:#bada55", e.detail)
  // change html
  let custInnerHTML = '<x title="" class="tagify__tag__addBtn" role="button" aria-label="add tag" onclick="addHandler()"></x><div><span class="tagify__tag-text">new</span></div>'
  if(e.type) {
      e.detail.tag.innerHTML = custInnerHTML;
  }
}

// callbacks props (for this demo, the same callback reference is assigned to every event type)
const tagifyCallbacks = {
  add: addCallback,
  remove: callback,
  input: callback,
  edit: callback,
  invalid: callback,
  click: callback,
  keydown: callback,
  focus: callback,
  blur: callback,
  "edit:input": callback,
  "edit:updated": callback,
  "edit:start": callback,
  "edit:keydown": callback,
  "dropdown:show": callback,
  "dropdown:hide": callback,
  "dropdown:select": callback
}

// this is an example React component which implemenets Tagify within
// itself. This example is a bit elaborate, to demonstrate what's possible.
const CustomTags = () => {
  // just a name I made up for allowing dynamic changes for tagify settings on this component
  const [tagifySettings, setTagifySettings] = useState([])
  const [tagifyProps, setTagifyProps] = useState([])

  // on component mount
  useEffect(() => {
    setTagifyProps({loading: true})

    getWhitelistFromServer(2000).then(response => {
      setTagifySettings(lastState => ({
        ...lastState,
        whitelist: response
      }))

      setTagifyProps({showDropdown: "a", loading: false})
    })

    // simulate setting tags value from an Ajax request
    getValue(3000).then(response => setTagifyProps({value: response}))

    // simulated state change where some tags were deleted
    setTimeout(
      () => setTagifyProps({value: ["bar"], showDropdown: false}),
      5000
    )
  }, [])

  // merged tagify settings (static & dynamic)
  const settings = {
    ...baseTagifySettings,
    ...tagifySettings,
    callbacks: tagifyCallbacks
  }

  return (
    <>
      <p>
        Wait a few seconds to see things happen. <br />
        <small>
          <em>(Carefully examine the source-code)</em>
        </small>
      </p>
      <Tags settings={settings} {...tagifyProps} />
    </>
  )
}

export default CustomTags
