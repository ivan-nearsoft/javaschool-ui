$(document).ready(function () {
    rest('GET', config.rest.city, _getCities);
    rest('GET', config.rest.type, _types);
    rest('GET', config.rest.shippingInformation, _fillShippingInformation);

    $('.city-select').change(_changeCity);
    $('#typeSelect').change(_fillSizeSelect);
    $('#sizeSelect').change(_fillTransportSelect);
    $('#transportSelect').change(_fillTimeSelect);

    function _fillSizeSelect() {
        let typeSelected = $('#typeSelect option:selected').val();
        if (!_isOptionValueValid(typeSelected)) {
            alert({"responseText": "You need to select a valid type"});
            return;
        }
        rest('GET', config.rest.size + typeSelected, _sizes);
    }

    function _fillTransportSelect() {
        let sizeSelected = $('#sizeSelect option:selected').val();
        if (!_isOptionValueValid(sizeSelected)) {
            alert({"responseText": "You need to select a valid size"});
            return;
        }
        rest('GET', config.rest.transport + sizeSelected, _transports);
    }

    function _fillTimeSelect() {
        let transportSelected = $('#transportSelect option:selected').val();
        if (!_isOptionValueValid(transportSelected)) {
            alert({"responseText": "You need to select a valid transport"});
            return;
        }
        rest('GET', config.rest.time + transportSelected, _times);
    }

    function _fillShippingInformation(shippingInformations) {
        $(shippingInformations).each(function (index, shippingInformation) {
            fillShippingTable(shippingInformation);
        });
    }

    function _getCities(cities) {
        _fillSelect(cities, $('#originSelect'));
        _fillSelect(cities, $('#destinationSelect'));
    }

    function _types(sizes) {
        _fillSelect(sizes, $('#typeSelect'));
    }

    function _sizes(sizes) {
        _fillSelect(sizes, $('#sizeSelect'));
    }

    function _transports(transports) {
        _fillSelect(transports, $('#transportSelect'));
    }

    function _times(times) {
        _fillSelect(times, $('#timeSelect'));
    }

    function _fillSelect(array, select) {
        if (select.find('option').length <= 1) {
            $(array).each(function (index, city) {
                select.append(createOption(city));
            });
        }
    }

    function _changeCity(event) {
        let originSelected = $('#originSelect option:selected').val();
        let destinationSelected = $('#destinationSelect option:selected').val();
        let isOriginValid = originSelected !== 'empty';
        let isDestinationValid = destinationSelected !== 'empty';
        let areOptionsValid = isOriginValid && isDestinationValid;
        if (areOptionsValid) {
            rest('POST', config.rest.cityPath, _cityPath, {
                origin: originSelected,
                destination: destinationSelected
            });
        }
    }

    function _cityPath(path) {
        $('#cityPath').val(path);
    }
});