import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onclick }) {
  return (
    <button className="button" onClick={onclick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(true);
  const [friends, setFriends] = useState(initialFriends);

  function hundleShowAddFriend() {
    setShowAddFriend(show => !show);
  }

  function hundleAddFriend(friend) {
    setFriends(friends => [...friends, friend])
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends}/>
        {showAddFriend && <FormAddFriend onAddFriend={hundleAddFriend}/>}
        <Button onclick={hundleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      <FormSplitBill />
    </div>
  );
}

function FriendsList({friends}) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance === 0 ? (
        <p>You and {friend.name} are even</p>
      ) : friend.balance > 0 ? (
        <p className="green">
          {friend.name} owes you {friend.balance}$
        </p>
      ) : (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}

      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend({onAddFriend}) {

  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");


  if(!name || !image) return;

  const id = crypto.randomUUID();
  function hundleSubmit(e) {
    e.preventDefault();

    const newFriend = {
      name, 
      id, 
      image: `${image}?=${id}`,
      balance: 0
    }

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={hundleSubmit}>
      <label>👫 Friend Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

      <label>🌉 Image Url</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)}/>

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💰 Bill value</label>
      <input type="text" />

      <label>🧍 Your Expense</label>
      <input type="text" />

      <label>👫 X's Expense</label>
      <input type="text" disabled />

      <label>🤑 Who is paying the bill ?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
