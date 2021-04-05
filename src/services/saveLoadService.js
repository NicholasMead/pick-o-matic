import { Member } from "../models/member";

export const LoadFromCSV = async (file) => {

    let newMembers = await file.text();
    newMembers = JSON.parse(newMembers);
    
    newMembers
        .filter(m => m.name)    
        .map(m => {
            let member = Member(m.name);
            member.score = m.score ?? 0;
            member.selectedCount = m.selectedCount ?? 0;
            return member;
        });

    return newMembers;    
}

export const SaveToCSV = async (members) => {
    var data = JSON.stringify(members)

    let blob = new Blob([data], {type:'text/csv;charset-utf-8'});
    let url = URL.createObjectURL(blob);
    
    let pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', 'members.json');
    pom.click();

}

export const SaveToLocaleStorage = (members) => {
    var data = JSON.stringify(members) 
    localStorage.setItem('members', data);
}

export const LoadFromLocaleStorage = () => {
    var members = localStorage.getItem('members');
    return JSON.parse(members);
}