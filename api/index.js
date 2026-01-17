export default async function reciver(req,res) {
const respond=512*1024;
const ResponseBody="A".repeat(respond);
const FinalResponse=ResponseBody+"HAAAA??";
res.status(200).send(FinalResponse);
}
