import {
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import styles from "./addGroupModal.style";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { DUMMYDATA } from "../../dashboard/dummydata";
import app from "../../../firebaseConfig";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const AddGroupModal = ({ closeModal, modalStatus }) => {
  const [groupName, setGroupName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [invitingMember, setInvitingMember] = useState(false);
  const [invitedMemberList, setInvitedMemberList] = useState([]);
  const [groupCreationError, setGroupCreationError] = useState(false);
  const memberListRef = useRef();

  const db = getFirestore(app);
  const addNewGroupHandler = async () => {
    const docRef = await addDoc(collection(db, "Groups"), {
      groupName: groupName,
      members: ["Cj"],
      groupCount: 1,
      gamesList: {},
      sentInvites: invitedMemberList,
      readyCount: 0,
      gameChosen: "N/A",
      recentlyPlayed: "N/A",
      lastPlayed: "N/A",
      proposedDate: "",
    });
  };

  // Listen to see if user is addding a new member and jump to the bottom or top of the list.
  useEffect(() => {
    if (memberListRef.current.props.data.length == 0 && !invitingMember) return;

    if (invitingMember) {
      memberListRef.current.scrollToEnd();
    } else {
      memberListRef.current.scrollToIndex({ index: 0 });
    }
  }, [invitingMember]);

  // Update the invited members list
  const sendInvite = () => {
    setInvitedMemberList((previous) => [...previous, memberName]);
    setInvitingMember(false);
    setMemberName("");
  };

  // Finalize the members and send invites to all emails and create group.
  const createGroup = () => {
    let currentGroups = DUMMYDATA.map((item) => item.groupName);
    if (currentGroups.includes(groupName)) {
      alert("Group name is already in use.");
      setGroupCreationError(true);
      return;
    } else if (!groupName) {
      alert("What's your group name again?");
      setGroupCreationError(true);
      return;
    } else if (invitedMemberList.length == 0) {
      alert("A group involves more than one person...");
      setGroupCreationError(true);
      return;
    } else
      DUMMYDATA.push({
        groupId: DUMMYDATA.length + 1,
        groupName: groupName,
        members: ["Cj"],
        groupCount: 1,
        gamesList: {},
        sendInvites: invitedMemberList,
        readyCount: 0,
        gameChosen: "N/A",
        recentlyPlayed: "N/A",
        lastPlayed: "N/A",
        proposedDate: "",
      });
    closeModal();
  };
  // const beginAddingMember = () => {
  //   setInvitingMember(!invitingMember);
  //   if (invitingMember) memberListRef.scrollToEnd();
  //   else memberListRef.scrollToTop(0);
  // };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalStatus}
        onRequestClose={() => {
          Alert.alert("Alert Title", "My Alert Msg", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
          Alert.alert("Modal has been closed.");
          closeModal;
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={closeModal} style={styles.closeBtn}>
              <MaterialCommunityIcons
                name="close-box-outline"
                size={32}
                color={"white"}
              />
            </Pressable>
            <Text style={styles.modalText}>Create Group</Text>
            <View style={styles.groupFormContainer}>
              <View style={styles.groupFormWrapper}>
                {/* Group Name Input */}
                <View style={styles.groupNameForm}>
                  <Text style={styles.formTextHeader}>Group Name</Text>
                  <TextInput
                    style={
                      !groupCreationError
                        ? styles.groupNameInput
                        : [styles.groupNameInput, styles.groupNameInputError]
                    }
                    onChangeText={setGroupName}
                    value={groupName}
                  />
                </View>
                {/* Member Invite Form */}
                <View style={styles.memberNameForm}>
                  <Text style={styles.formTextHeader}>Members</Text>
                  <View style={styles.memberListContainer}>
                    {/* Send new invite button */}
                    <Pressable
                      onPress={() => setInvitingMember(!invitingMember)}
                      style={styles.addMemberBtn}
                    >
                      {invitingMember ? (
                        <MaterialCommunityIcons
                          name="minus-box-outline"
                          size={24}
                          color={"white"}
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="plus-box-outline"
                          size={24}
                          color={"white"}
                        />
                      )}
                    </Pressable>

                    {invitedMemberList.length == 0 && !invitingMember && (
                      <View style={styles.emptyListContainer}>
                        <Text style={styles.emptyListText}>
                          Press the + button to begin inviting other gamers!
                        </Text>
                      </View>
                    )}

                    {/* Invited members list */}
                    <FlatList
                      ref={memberListRef}
                      data={invitedMemberList}
                      ListFooterComponent={
                        invitingMember ? (
                          <>
                            <TextInput
                              onSubmitEditing={sendInvite}
                              style={styles.groupNameInput}
                              onChangeText={setMemberName}
                              value={memberName}
                              placeholder="Enter user email"
                              placeholderTextColor="#FFF"
                            />
                            {/* <Text>X</Text> */}
                          </>
                        ) : null
                      }
                      extraData={invitingMember}
                      renderItem={({ item: member }) => (
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderColor: "white",
                            borderStyle: "solid",
                          }}
                        >
                          <Text style={styles.memberInvited}>
                            {member + " "}
                            <Text
                              style={{
                                fontStyle: "italic",
                                fontSize: 14,
                                color: "lightgrey",
                              }}
                            >
                              (Pending)
                            </Text>
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                </View>
              </View>
              {/* Form Button Actions */}
              <View style={styles.modalActions}>
                <Pressable onPress={createGroup}>
                  <Text>Create Group</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddGroupModal;
