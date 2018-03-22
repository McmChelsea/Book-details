            $(document).ready(function() {
                //JSON file data uploaded in MYJSON
                $.getJSON("https://api.myjson.com/bins/lbgxf", function(data) {
                    var jsonItems = []; //Array created to store values from JSON files
                    $.each(data, function(index, value) {
                        jsonItems.push(value); //Pushing or inserting the values inside the array
                    });

                    //Looping table headers
                    var col = [];
                    for (var i = 0; i < jsonItems.length; i++) {
                        for (var value in jsonItems[i]) {
                            if (col.indexOf(value) === -1) {
                                col.push(value);
                            }
                        }
                    } 

                    col.push("currency");
                    var table = document.createElement("table");
                    var tr = table.insertRow(-1);
                    
                    //Looping the headers
                    for (var i = 0; i < col.length; i++) {
                        var th = document.createElement("th");
                        th.innerHTML = col[i];
                        tr.appendChild(th);
                    }

                    //Looping the cell values
                    for (var i = 0; i < jsonItems.length; i++) {
                        tr = table.insertRow(-1);
                        for (var j = 0; j < col.length; j++) {
                            var tabCell = tr.insertCell(-1);
                            if (col[j] == "date") {
                                var dateString = jsonItems[i][col[j]].split(/[/]|[-]/g); //splitting the date value w.r.t '/' and '-'
                                var dateFormat = dateString[2] + "/" + dateString[1] + "/" + dateString[0]; // changing into yyyy-mm-dd format
                                tabCell.innerHTML = dateFormat;
                            } else if (col[j] == "price") {
                                var priceFormat = jsonItems[i][col[j]];
                                if (priceFormat.indexOf('£') > -1) { //Checking whether pound symbol is available,since the json file contained only pound symbol
                                    var price = priceFormat.substring(1);
                                    tabCell.innerHTML = price;
                                    jsonItems[i][col[j + 1]] = "£"; //Updating the corresponding currency row
                                } else {
                                    tabCell.innerHTML = '-';
                                    jsonItems[i][col[j + 1]] = "-";
                                }
                            } else {
                                tabCell.innerHTML = jsonItems[i][col[j]];
                            }
                        }
                    }

                    //Displaying the data
                    var divContainer = document.getElementById("showData");
                    divContainer.innerHTML = "";
                    divContainer.appendChild(table);
                });
            });