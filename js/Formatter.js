function fnDateTimeFormatter(oValue) {
	if (oValue === undefined || oValue === "" || oValue === null) {
		return;
	} else {
		var fecha = new Date(oValue);
		fecha.setDate(fecha.getDate() + 1);
		return fecha;
	}
}