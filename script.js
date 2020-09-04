const urlParams = new URLSearchParams(document.location.search);
const sub = document.getElementById("sub");
const side = document.querySelector("#side");
const options = {
  type: "classification",
  debug: true
};

const modelDetails = {
  model: "model/model.json",
  metadata: "model/model_meta.json",
  weights: "model/model.weights.bin"
};

const neuralNetwork = ml5.neuralNetwork(options);
neuralNetwork.load(modelDetails,predict);
const inputs = {
  X1: parseInt(urlParams.get('x1')),
  X2: parseInt(urlParams.get('x2')),
  X3: parseInt(urlParams.get('x3')),
  X4: parseInt(urlParams.get('x4')),
  X5: parseInt(urlParams.get('x5')),
  X6: parseInt(urlParams.get('x6'))
}

console.log(inputs);
function predict(){
   
  neuralNetwork.classify(inputs, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(results[0]);
  
    if (results[0].confidence > 0 && results[0].label == 0)
    {
     
      side.innerHTML = 'unhappy.';
      side.style.backgroundColor = "red";
      console.log("unhappy");
    } 
    if  (results[0].confidence > 0 && results[0].label == 1) {
      console.log("happy");
      side.innerHTML = 'happy.';
      side.style.backgroundColor = "green";

    }

  });
}
sub.onclick=predict;
//Attribute Information:
//https://archive.ics.uci.edu/ml/datasets/Somerville+Happiness+Survey
// D = decision attribute (D) with values 0 (unhappy) and 1 (happy)
// X1 = the availability of information about the city services
// X2 = the cost of housing
// X3 = the overall quality of public schools
// X4 = your trust in the local police
// X5 = the maintenance of streets and sidewalks
// X6 = the availability of social community events

// Attributes X1 to X6 have values 1 to 5.