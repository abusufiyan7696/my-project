import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { AiFillWarning } from "react-icons/ai";
import {
  FaChevronCircleUp,
  FaChevronCircleDown,
  FaSearch,
  FaPencilAlt,
  FaTrash,
  FaSave,
} from "react-icons/fa";
import Loader from "../Loader/Loader";
import { CCollapse } from "@coreui/react";
import GlobalValidation from "../ValidationComponent/GlobalValidation";
import { FaCaretDown } from "react-icons/fa";
import moment from "moment";
import { environment } from "../../environments/environment";
import SelectSEDialogBox from "../SelectSE/SelectSEDialogBox";
import { MultiSelect } from "react-multi-select-component";
import { BiCheck } from "react-icons/bi";
import TargetTable from "./TargetTable.js";
import { useDispatch } from "react-redux";
import {
  setReportRunIdRedux,
  updateQuaterDate,
  updateSfCust,
  updateSfId,
  updateSfViewData,
  updateSoftwarePayload,
  updatedOwnerDivisions,
  updatedSalesExectiveId,
  updatedVedorNameWithId,
  updatedVendorId,
} from "../../reducers/SelectedSEReducer";
import { useSelector } from "react-redux";
import GlobalHelp from "../PrimeReactTableComponent/GlobalHelp";
import SavedSearchGlobalNew from "../PrimeReactTableComponent/SavedSearchGlobalNew";
import { useLocation } from "react-router-dom";
import Utils from "../../Utils.js";
import "../RevenueMetrices/RevenueForcast.scss";
import { BsFilterRight } from "react-icons/bs";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import AE from "../../assets/AE.jpg";
import { logInfo, logWarn, logError, logDebug } from "../../logger/logger";

export default function SoftwareSearchFilters({
  softwareData,
  setTargetReviewsData,
  setTableFlag,
  setSelector,
  showDetails,
  setShowDetails,
  setSoftwareData,
  setWowDisplay,
  fdate,
  setFdate,
  reportRunId,
  setreportRunId,
  setwowtype,
  qdate,
  setQdate,
  setTargetDataKeys,
  viewDisplay,
  setViewDisplay,
  wowDate,
  setWOwDate,
  setData,
  data,
  tableData,
  setTableData,
  headerData,
  setHeaderData,
  setViewSlesId,
  enableTable,
  setEnableTable,
  tableTruth,
  setTableTruth,
  setEntityIds,
}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [p1data, setp1Data] = useState([]);
  const [selectedp1, setSelectedp1] = useState([]);
  const [resetVendor, setResetVendor] = useState([]);
  const [cheveronIcon, setCheveronIcon] = useState(FaChevronCircleUp);
  const [visibleC, setVisibleC] = useState(false);
  const [salesfullAccess, setSalesfullAccess] = useState([]);
  const [accountOwner, setAccountOwner] = useState([]);
  const [selectedAccountOwner, setSelectedAccountOwner] = useState([]);
  const [vendor1, setVendor1] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [division, setDivision] = useState(-1);
  const [stDate, setStDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );

  const [softwarePayload, setSoftwarePayload] = useState({});
  const [selectedExe, setSelectedExe] = useState("");
  const [selectedObject, setSelectedObject] = useState(null);

  useEffect(() => {
    if (id == "-1") {
      setSoftwarePayload(() => {
        return {
          mode: "view",
          from: moment(quarterdate).format("YYYY-MM-DD"),
          duration: duration == undefined ? "4" : duration,
          vendors: vendor1,
          divisions: division == null || division == undefined ? -1 : division,
          executives: salesEx == 1 ? executiveIdPayload : salesEx,
          salesId: salesexecutiveid,
          isActive: "true",
          isIndividual:
            isIndividualChecked.length == 0 ? "false" : isIndividualChecked,
          type: "view",
          key: "1662974432015",
          selectExecs: Salesexecutivename,
          saveSE: "true",
          optType: -1,
          quarter: -1,
          status: -1,
          duration2: -1,
          measures: -1,
          monthsel: -1,
          viewByTime: -1,
          fyear: -1,
          customers: -1,
          prospects: -1,
          practices: -1,
          countries: -1,
          customerType: -1,
          summary: -1,
          showBy: "week",
          aelocation: -1,
          engComp: -1,
          Divisions: -1,
          accOwner: -1,
          newCust: -1,
          accType: -1,
          subType: "detail",
          entityId: "-1",
        };
      });
      setSelectedSEVal("-2");
      setActionSelector("view");
      setSelectedp1(resetVendor);
      setselectesFOwnerDivison(sFOwnerDivisionsDropdown);
      setSelectedAccountOwner(accountOwner);
      setDuration("4");
      let valuesString = resetVendor?.map((item) => item.value).join(",");
      setVendor1(valuesString);
    } else {
      setSoftwarePayload(() => {
        return {
          mode: filterData?.mode,
          from: filterData.from,
          duration: filterData?.duration,
          vendors:
            filterData.vendors == undefined ? vendor1 : filterData.vendors,
          divisions:
            filterData.divisions == "-1" ||
            filterData.divisions == "105,110,103,2,111,1,104,99"
              ? -1
              : filterData.divisions,
          executives:
            filterData.executives == "-1"
              ? -1
              : filterData.executives == "-2"
              ? -2
              : filterData.executives,
          salesId: filterData.salesId,
          isActive: filterData.isActive,
          isIndividual:
            filterData.isIndividual == "false"
              ? false
              : filterData.isIndividual,
          type: filterData?.type,
          key: "1662974432015",
          selectExecs: filterData.selectExecs,
          saveSE: filterData.saveSE,
          optType: filterData.optType == "-1" ? -1 : filterData.optType,
          quarter: filterData.quarter == "-1" ? -1 : filterData.quarter,
          status: filterData.status == "-1" ? -1 : filterData.status,
          duration2: filterData.duration2 == "-1" ? -1 : filterData.duration2,
          measures: filterData.measures == "-1" ? -1 : filterData.measures,
          monthsel: filterData.monthsel == "-1" ? -1 : filterData.monthsel,
          viewByTime:
            filterData.viewByTime == "-1" ? -1 : filterData.viewByTime,
          fyear: filterData.fyear == "-1" ? -1 : filterData.fyear,
          customers: filterData.customers == "-1" ? -1 : filterData.customers,
          prospects: filterData.prospects == "-1" ? -1 : filterData.prospects,
          practices: filterData.practices == "-1" ? -1 : filterData.practices,
          countries: filterData.countries == "-1" ? -1 : filterData.countries,
          customerType:
            filterData.customerType == "-1" ? -1 : filterData.customerType,
          summary: filterData.summary == "-1" ? -1 : filterData.summary,
          showBy: filterData.showBy,
          aelocation:
            filterData.aelocation == "-1" ? -1 : filterData.aelocation,
          engComp: filterData.engComp == "-1" ? -1 : filterData.engComp,
          Divisions: filterData.Divisions == "-1" ? -1 : filterData.Divisions,
          accOwner: filterData.accOwner == "-1" ? -1 : filterData.accOwner,
          newCust: filterData.newCust == "-1" ? -1 : filterData.newCust,
          accType: filterData.accType == "-1" ? -1 : filterData.accType,
          subType: filterData.subType,
        };
      });
    }
  }, [filterData, id, resetVendor]);

  // Function to format the date
  function formatDate(date) {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      // Change to "numeric" to remove leading zeros
      year: "numeric",
    };
    const formattedDate = date?.toLocaleString("en-IN", options);
    return `${formattedDate} 00:00:00 GMT+0530 (India Standard Time)`;
  }

  useEffect(() => {
    if (id != "-1") {
      const updateAction = filterData?.type;
      const updateSalesExcetive = filterData?.executives;
      const excludedValues = filterData?.vendors; // Trim each value

      const updateVendors = p1data?.filter((item) => {
        // Check if item.value is included in the excludedValues array
        return excludedValues?.includes(item.value);
      });
      const progressDataDivisions = filterData.divisions;
      const divisionsToFilter = progressDataDivisions
        ? progressDataDivisions?.split(",").map(Number)
        : [];
      const updatedOwnerDivisions = sFOwnerDivisionsDropdown.filter(
        (values) => {
          return divisionsToFilter?.includes(values.value);
        }
      );
      if (filterData.from !== undefined && filterData.from !== "") {
        const updatequarter = new Date(filterData.from);
        updatequarter.setMonth(updatequarter.getMonth() - 3);
        updatequarter.setFullYear(updatequarter.getFullYear() + 1);
        setStartDate(updatequarter);
      }
      const updateDuration = softwarePayload.duration;
      const integerValues = updatedOwnerDivisions.map((item) =>
        parseInt(item.value)
      );
      const commaSeparatedValues = filterData.divisions;
      const vendorvalues = filterData.vendors;
      const fromDateView = filterData.from;
      if (filterData.type != "target") {
        setVendor1(vendorvalues);
        setDivision(commaSeparatedValues);
        setDuration(updateDuration);
        setSelectedp1(updateVendors);
      }
      if (filterData.type == "view") {
        setQuarterDate(fromDateView);
      }
      const showby = filterData.showBy;
      const financeYearTarget = filterData?.from;
      const inputDate = filterData?.from;
      const fiscalYearStartDate = moment(inputDate)
        .startOf("year")
        .month(3) // April is month 3 (0-indexed)
        .date(1); // Set the day to 1st
      fiscalYearStartDate.subtract(1, "years");
      const From = fiscalYearStartDate.format("YYYY-MM-DD");
      const finalDate = moment(financeYearTarget).format("ddd MMM DD YYYY");
      const addinst = `${finalDate} 00:00:00 GMT+0530 (India Standard Time)`;
      const FinalDate = moment(addinst).toDate();
      const oneYearLater = moment(FinalDate).add(1, "year").toDate();

      if (filterData.type == "target") {
        setStDate(filterData.from);
        setSalesEx(updateSalesExcetive);
        setFinancialYearDate(oneYearLater);
      }

      if (
        filterData.divisions == "-1" ||
        filterData.divisions == "105,110,103,2,111,1,104,99"
      ) {
        setselectesFOwnerDivison(sFOwnerDivisionsDropdown);
      } else {
        setselectesFOwnerDivison(updatedOwnerDivisions);
      }

      // if (filterData.Divisions == "-1") {
      //   setselectesFOwnerDivison(sFOwnerDivisionsDropdown);
      // } else {
      //   setselectesFOwnerDivison(updatedOwnerDivisions);
      // }

      if (filterData.executives === "-1") {
        const dataExActive = "<< Active SE >>";
        setselectedSE(dataExActive);
      } else if (filterData.executives === "-3") {
        const dataExInactive = "<< InActive SE >>";
        setselectedSE(dataExInactive);
      } else if (filterData.executives === "1") {
        const dataSelectSe = "<< Select SE >>";
        setselectedSE(dataSelectSe);
      } else if (filterData.executives === "-2") {
        const dataAllSe = "<< All SE >>";
        setselectedSE(dataAllSe);
      } else if (filterData.executives?.length > 3) {
        const dataSelectSe = "<< Select SE >>";
        setselectedSE(dataSelectSe);
      }

      setActionSelector(updateAction);
      if (filterData.executives?.length > 3) {
        setSelectedSEVal("1");
      } else {
        setSelectedSEVal(updateSalesExcetive);
      }
      if (filterData.type == "wow") {
        setShowByValue(showby);
      }
      const updateAccount = filterData.accOwner;

      const updateAccountOwner = accountOwner.filter((values) => {
        return updateAccount?.includes(values.value);
      });
      if (filterData.accOwner == -1) {
        setSelectedAccountOwner(accountOwner);
      } else {
        setSelectedAccountOwner(updateAccountOwner);
      }
    }
  }, [
    id,
    filterData?.type,
    filterData?.executives,
    filterData?.vendors,
    filterData.divisions,
    p1data,
    filterData?.from,
    filterData?.showBy,
  ]);
  useEffect(() => {
    if (id != "-1") {
      const data = filterData.type;
      setActionSelector(data);
    }
  }, [id, filterData.type]);
  const [wirteData, setWriteData] = useState([]);
  const [salesEx, setSalesEx] = useState(-2);

  const abortController = useRef(null);
  const baseUrl = environment.baseUrl;
  const loggedUserId = localStorage.getItem("resId");
  const [salesSE, setSalesSE] = useState(-2);
  const [reportId, setReportId] = useState([]);
  const [fydata, setFydata] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [grpId, setGrpId] = useState([]);
  const [accessData, setAccessData] = useState([]);
  const [financeYear, setFinanceYear] = useState([]);
  const [targetOpen, setTargetOpen] = useState(false);
  const [duration, setDuration] = useState("4");
  const controller = new AbortController();
  const ref = useRef([]);
  const dispatch = useDispatch();
  const [viewsalesexectiveid, setViewSalesExectiveId] = useState(salesEx);

  useEffect(() => {
    setViewSalesExectiveId(formattedIds);
  }, [salesEx]);

  const [financeYears, setFinanceYears] = useState(new Date(financeYear));

  const SelectSEData = useSelector(
    (state) => state.selectedSEState.directSETreeData
  );
  const localSE =
    localStorage.getItem("selectedSELocal") === null
      ? []
      : JSON.parse(localStorage.getItem("selectedSELocal"));

  const isSalesPresentThenId = localSE.findIndex((obj) => obj.key);
  const [salesexecutiveid, setsalesExecutiveId] = useState("");
  const [Salesexecutivename, setsalesExecutiveName] = useState("");
  const [salesindividualid, setSalesIndividualId] = useState(0);
  const [salesindividualName, setSalesIndividualName] = useState("");
  useEffect(() => {
    if (isSalesPresentThenId !== -1) {
      const salesId = localSE[isSalesPresentThenId].id;
      const salespersonname = localSE[isSalesPresentThenId].text + ` & Team`;
      if (salesEx == 1) {
        setsalesExecutiveName(salespersonname);
        setsalesExecutiveId(salesId);
      }
    }
  }, [isSalesPresentThenId, salesEx]); // Run this effect only when isSalesPresentThenId changes

  const idsWithoutDirectSalesEx = localSE.map((item) => item.id);
  const idDirectSalesEx = localSE
    .filter((item) => item.key === "directsalesEx")
    .map((item) => item.id);
  const nameWithoutDirectSalesEx = localSE
    .filter((item) => !item.key || item.key !== "directsalesEx")
    .map((item) => item.salesPersonName);
  const formattedIds = idsWithoutDirectSalesEx.join(",");
  const formattedName = nameWithoutDirectSalesEx.join(",");
  const SalesExecutiveNames = Salesexecutivename + formattedName;
  useEffect(() => {
    if (salesEx === 1) {
      setSalesIndividualId(formattedIds);
      setViewSalesExectiveId(formattedIds);
      setSalesIndividualName(SalesExecutiveNames);
    }
  }, [salesEx]);

  useEffect(() => {
    dispatch(updatedSalesExectiveId(salesEx));
    dispatch(updateSfId(salesEx));
  }, [salesEx]);
  const isIndividualChecked = useSelector(
    (state) => state.selectedSEState.isIndividualChecked
  );

  useEffect(() => {
    // if (id != "-1" && softwarePayload.executives != "1") {
    //   dispatch(updatedSalesExectiveId(filterData?.executives));
    // } else {
    //   dispatch(updatedSalesExectiveId(executiveIdPayload));
    // }
    dispatch(updatedSalesExectiveId(softwarePayload?.executives));
    if (softwarePayload.executives == 1) {
      setSoftwarePayload((prevVal) => ({
        ...prevVal,
        executives: executiveIdPayload, // Assuming 'from' key directly sets the date object
      }));
    }
    if (softwarePayload.type == "target") {
      setSoftwarePayload((prevVal) => ({
        ...prevVal,
        from: moment(stDate).format("YYYY-MM-DD"), // Assuming 'from' key directly sets the date object
      }));
    }
  }, [filterData, softwarePayload.executives, stDate]);
  function transformObjects(data) {
    return localSE.map((item) => {
      if (Array.isArray(item)) {
        const [obj] = item;
        if (
          obj &&
          obj.id &&
          obj.text &&
          obj.type === "fte1" &&
          obj.parent === "id"
        ) {
          return {
            salesPersonName: obj.text,
            type: obj.type,
            id: parseInt(obj.id),
            status: JSON.parse(obj.li_attr).sestatus || "empActive",
          };
        }
      }
      return item;
    });
  }

  const generateDropdownLabel = (selectedOptions, allOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    const allValues = allOptions.map((item) => item.value);

    if (selectedValues.length === allValues.length) {
      return "<< ALL >>";
    } else {
      return selectedOptions.map((option) => option.label).join(", ");
    }
  };

  const getAccountOwner = () => {
    axios({
      method: "get",
      url: baseUrl + `/ProjectMS/Engagement/getAccountOwner`,
    })
      .then((res) => {
        // logInfo("Fetched  AccountOwner data successfully","getAccountOwner");
        let custom = [];

        let data = res.data;

        data.length > 0 &&
          data.forEach((e) => {
            let dpObj = {
              label: e.Name,
              value: e.account_owner_id,
            };
            custom.push(dpObj);
          });
        custom.push({ label: "UnAssigned", value: 999 });
        setAccountOwner(custom);
        setSelectedAccountOwner(custom);
      })
      .catch((error) => {
        // logError("Error Fetching AccountOwner data successfully","getAccountOwner");
      });
  };

  const transformedData = transformObjects(data);
  const filteredData = transformedData
    .filter((obj, index) => {
      return index === transformedData.findIndex((o) => obj.id === o.id);
    })
    .filter((item) => !Array.isArray(item) || item.length === 0);
  const idArray = transformedData.map((item) => item.id);
  const filteredIds = idArray.filter((id) => typeof id === "number");
  const updatedIds = filteredIds.map((id) =>
    id === "1717" || "3887" || "3887" || "3977" || "4895" || "4872942"
      ? grpId
      : id
  );
  const salesPersonNames = filteredData.map((item) => {
    if (
      (item.salesPersonName && item.salesPersonName === "Kirsten Craft") ||
      "Sarat Addanki" ||
      "Satyanarayana Bolli" ||
      "Supervisor Orphans" ||
      "Michelle Shuler"
    ) {
      return `${item.salesPersonName}`;
    }
    return item.salesPersonName;
  });

  const commaSeparatedNames = salesPersonNames.join(",");
  const salesPersonNamesBulk = filteredData.map((item) => {
    if (
      item.salesPersonName === "Kirsten Craft" &&
      "Sarat Addanki" &&
      "Satyanarayana Bolli" &&
      "Supervisor Orphans" &&
      "Michelle Shuler"
    ) {
      return `${item.salesPersonName} & team`;
    }
    return item.salesPersonName;
  });

  const commaSeparatedNamesBulk = salesPersonNamesBulk.join(",");
  const salesPersonIds = filteredData.map((item) => item.id);
  const commaSeparatedIds = salesPersonIds.join(",");
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [buttonAction, setButtonAction] = useState(false);
  const pageurl = "/#/pmo/salesSoftwares";
  const page_Name = "Software Plan Review";
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    date.setMonth(date.getMonth() - 3);
    return date;
  });

  const [selectedSEVal, setSelectedSEVal] = useState(-2);
  const [editmsg, setEditAddmsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [actionSelector, setActionSelector] = useState("view");
  const [selectedVendorData, setSelectedVendorData] = useState([]);
  const [vendorData, setVendorData] = useState([]);
  const [vendorDropdown, setvendorDropdown] = useState([]);
  const [selectedvendor, setselectedvendor] = useState([]);
  const [selectedSE, setselectedSE] = useState("<< All SE >>");
  const [salesExecutiveDropdown, setsalesExecutiveDropdown] = useState([]);
  const [sFOwnerDivisionsDropdown, setSFOwnerDivisionsDropdown] = useState([]);
  const [selectesFOwnerDivison, setselectesFOwnerDivison] = useState([]);
  const [searching, setsearching] = useState(false);
  const [showbyvalue, setShowByValue] = useState("week");
  const currentDate = new Date();
  const oneYearLater = new Date(
    currentDate.getFullYear() + 1,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  useEffect(() => {
    dispatch(updatedVendorId(vendor1));
    dispatch(updatedVedorNameWithId(selectedp1));
    dispatch(updatedOwnerDivisions(selectesFOwnerDivison));
  }, [vendor1, selectedp1, selectesFOwnerDivison]);
  const [FinancialYearDate, setFinancialYearDate] = useState(oneYearLater);
  const year = moment(startDate).format("yyyy-MM-DD").split("-")[0];
  const month = 1;
  const dd = moment({ year, month: month - 1 })
    .startOf("month")
    .format("YYYY-MM-DD");
  // const [stDate, setStDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

  const [filterDateForTarget, setFilterDateFortarget] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [selectFilter, setSelectFilter] = useState("");
  // useState(() => {
  //   const today = new Date();
  //   const year = today.getUTCFullYear();
  //   const quarter = Math.floor((today.getMonth() + 3) / 3); // Calculate current quarter
  //   const startMonth = (quarter - 1) * 3; // Start month of the quarter
  //   const startDate = new Date(year, startMonth, 1); // Start date of the quarter
  //   return startDate;
  // });

  const DateChange = ({ id, value }) => {
    const year = moment(value).format("yyyy-MM-DD").split("-")[0];
    const month = 4;
    const dd = moment({ year, month: month - 1 })
      .startOf("month")
      .format("YYYY-MM-DD");

    setStDate(dd);
    setWOwDate(dd);
    setSoftwarePayload((prevState) => {
      return { ...prevState, ["from"]: moment(dd).format("yyyy-MM-DD") };
    });
    if (id === "executives" && value === "1") {
      setVisible(true);
    }
  };
  const defaultDate = () => {
    const now = new Date();
    const quarter = Math.floor(now.getMonth() / 3);
    const firstDate = new Date(now.getFullYear(), quarter * 3, 1);
    return firstDate.toLocaleDateString("en-CA");
  };

  // Create a new Date object with the initial date
  let initialDate = financeYears; // Replace this with your desired initial date

  let daysToSubtract = 9;
  initialDate.setDate(initialDate.getDate() - daysToSubtract);
  let monthsToSubtract = 4;
  initialDate.setMonth(initialDate.getMonth() - monthsToSubtract);
  let yearsToSubtract = 0;
  initialDate.setFullYear(initialDate.getFullYear() - yearsToSubtract);

  const [wowadata, setwowDatapaylaod] = useState([]);
  const [viewwData, setviewDataPayload] = useState([]);
  const [targetDataaPayload, settargetDataPayload] = useState([]);

  const [entity, setEntity] = useState([]);
  const [selectedEntity, setselectedEntity] = useState([]);
  const getEntityList = async () => {
    try {
      const resp = await axios.get(
        baseUrl + `/revenuemetricsms/executiveMRF/GetEntityList`
      );
      let entitylist = resp.data || [];

      // const unassigned = { label: "<<Unassigned>>", value: 0 };
      // entitylist = [unassigned, ...entitylist];

      setEntity(entitylist);
      setselectedEntity(entitylist);
      const selectedEntityIds = entitylist.map((d) => d.value);
      onFilterChange({
        id: "entityId",
        value: selectedEntityIds.toString(),
      });
    } catch (error) {
      console.error("Error fetching entity list:", "getEntityList");
    }
  };

  useEffect(() => {
    getEntityList();
  }, []);

  const ArrowRenderer = ({ expanded }) => (
    <>
      {expanded ? (
        <FaCaretDown className="chevronIcon" />
      ) : (
        <FaCaretDown className="chevronIcon" />
      )}
    </>
  );

  const getWriteAcess = () => {
    axios
      .get(baseUrl + `/SalesMS/software/getSalesVendors`)
      .then((res) => {
        // logInfo("Fetched getSalesVendors successfully","getWriteAcess");
        const data = res.data;
        let custom = [];

        data.forEach((e) => {
          let dpObj = {
            label: e.vendor,
          };
          custom.push(dpObj);
        });

        setVendorData(custom);
        setSelectedVendorData(custom);
      })
      .catch((error) => {
        // logError("Error Fetched getSalesVendors ","getWriteAcess");
      });
  };

  const practice1 = () => {
    axios
      .get(baseUrl + `/SalesMS/software/getSalesVendors`)
      .then((res) => {
        // logInfo("Fetched SalesVendors data successfully","practice1");
        const data = res.data;
        let custom = [];

        data.forEach((e) => {
          let dpObj = {
            label: e.vendor,
            value: e.vendor,
          };
          custom.push(dpObj);
        });
        // Check if the item with the label "Prolifics - Jam/Panther/XMLink" exists in the options
        const initialSelection = custom.some(
          (item) => item.value === "Prolifics - Jam/Panther/XMLink"
        )
          ? custom.filter(
              (item) => item.value !== "Prolifics - Jam/Panther/XMLink"
            )
          : custom;
        let valuesArray = custom.map((item) => item.value);
        let valuesString = initialSelection.map((item) => item.value).join(",");

        setVendor1(valuesString);
        setp1Data(custom);
        setSelectedp1(initialSelection);
        setResetVendor(initialSelection);
      })
      .catch((error) => {
        // logError("Error Fetched getSalesVendors ","practice1");
      });
  };

  //// -------breadcrumbs-----

  const [routes, setRoutes] = useState([]);
  let textContent = "Sales";
  let currentScreenName = ["S/W Plan and Review"];
  sessionStorage.setItem(
    "breadCrumbs",
    JSON.stringify({
      routes: routes,
      currentScreenName: currentScreenName,
      textContent: textContent,
    })
  );

  useEffect(() => {
    getMenus();
    getAccountOwner();
  }, []);

  const getMenus = () => {
    axios({
      method: "GET",
      url: baseUrl + `/CommonMS/master/getMenus?loggedUserId=${loggedUserId}`,
    })
      .then((resp) => {
        // logInfo("Autherization loggedUserId successfully","getMenus");
        const modifiedUrlPath = "/pmo/salesSoftwares";
        getUrlPath(modifiedUrlPath);

        let data = resp.data.map((menu) => {
          if (menu.subMenus) {
            menu.subMenus = menu.subMenus.filter(
              (subMenu) =>
                subMenu.display_name !== "Project Timesheet (Deprecated)" &&
                subMenu.display_name !== "Invoice Details" &&
                subMenu.display_name !== "Accounting" &&
                subMenu.display_name !== "Upload" &&
                subMenu.display_name !== "Practice Calls [Deprecated]"
            );
          }

          return menu;
        });

        data.forEach((item) => {
          if (item.display_name === textContent) {
            setRoutes([item]);
            sessionStorage.setItem("displayName", item.display_name);
          }
        });
        const projectStatusReportSubMenu = data
          .find((item) => item.display_name === "Sales")
          .subMenus.find(
            (subMenu) => subMenu.display_name === "S/W Plan & Review"
          );
        setAccessData(projectStatusReportSubMenu.access_level);
      })
      .catch((error) => {
        // logError("Error during authorization", "getMenus");
      });
  };
  const getUrlPath = (modifiedUrlPath) => {
    axios({
      method: "get",
      url:
        baseUrl +
        `/CommonMS/security/authorize?url=${modifiedUrlPath}&userId=${loggedUserId}`,
    })
      .then((res) => {
        //  logInfo("Fetched menus successfully","getUrlPath");
      })
      .catch((error) => {
        //  logError("Error during authorization", "getUrlPath");
      });
  };

  useEffect(() => {
    getWriteAcess();
    practice1();
  }, []);
  {
    wirteData == loggedUserId ? "sai Bandhavi" : "sai Teja";
  }

  const array = wirteData;

  const arrayToString = array.join(",");

  const firstData = "a,b,c,d";
  const secondData = "e,f,g,a";
  const dataArray = wirteData;
  const isIdPresent = dataArray.some((item) => item.user_id === +loggedUserId);
  const isAnyElementPresent = () => {
    const firstDataElements = firstData.split(",");
    const secondDataElements = secondData.split(",");

    for (let i = 0; i < secondDataElements.length; i++) {
      if (firstDataElements.includes(secondDataElements[i])) {
        return true;
      }
    }
    return false;
  };

  const [quarterdate, setQuarterDate] = useState(() => {
    const today = new Date();
    const year = today.getUTCFullYear();
    const quarter = Math.floor((today.getMonth() + 3) / 3); // Calculate current quarter
    const startMonth = (quarter - 1) * 3; // Start month of the quarter
    const startDate = new Date(year, startMonth, 1); // Start date of the quarter
    return startDate;
  });

  //---------------------------------------Values----------------------------------------------

  const executiveIdPayload = SelectSEData;
  const targetDataPayload = {
    mode: "edit",
    from: id == "-1" ? fydata : filterData.from,
    duration: "4",
    vendors: "-1",
    divisions: "-1",
    executives: "0",
    isActive: "true",
    isIndividual:
      isIndividualChecked.length == 0 ? "false" : isIndividualChecked,
    type: "target",
    key: "1662978029003",
    selectExecs: "-2",
    saveSE: "true",
    customers: -1,
    prospects: -1,
    practices: -1,
    countries: -1,
    customerType: -1,
    summary: -1,
    showBy: -1,
    optType: -1,
    quarter: -1,
    status: -1,
    duration2: -1,
    monthsel: -1,
    viewByTime: -1,
    fyear: -1,
    aelocation: -1,
    engComp: -1,
    Divisions: -1,
    accOwner: softwarePayload.accOwner,
    newCust: -1,
    accType: -1,
    measures: -1,
    entityId: "-1",
  };

  const wowDataPayload = {
    mode: "wow",
    from: moment(quarterdate).format("YYYY-MM-DD"),
    duration: duration,
    vendors: vendor1,
    divisions:
      division == undefined ||
      division == null ||
      division == "105,110,103,2,111,1,104,99"
        ? -1
        : division,
    executives: salesEx == 1 ? formattedIds : salesEx,
    type: "wow",
    subType: "detail",
    isActive: "true",
    isIndividual:
      isIndividualChecked.length == 0 ? "false" : isIndividualChecked,
    saveSE: "false",
    selectExecs: "",
    showBy: showbyvalue,
    optType: -1,
    quarter: -1,
    status: -1,
    duration2: -1,
    measures: -1,
    monthsel: -1,
    viewByTime: -1,
    fyear: -1,
    customers: -1,
    prospects: -1,
    practices: -1,
    countries: -1,
    customerType: -1,
    summary: -1,
    aelocation: -1,
    engComp: -1,
    Divisions: -1,
    accOwner: softwarePayload.accOwner,
    newCust: -1,
    accType: -1,
    entityId: "-1",
  };
  const newStartDate = moment(startDate);

  const viewDataPayload = {
    mode: "view",
    from: moment(quarterdate).format("YYYY-MM-DD"),
    duration: duration == undefined ? "4" : duration,
    vendors: vendor1,
    divisions:
      division ===
        sFOwnerDivisionsDropdown.map((item) => item.value).join(",") ||
      division == undefined
        ? -1
        : division == null
        ? -1
        : division,
    // executives: salesSE,
    executives: salesEx == 1 ? executiveIdPayload : salesEx,
    salesId: salesexecutiveid,
    isActive: "true",
    isIndividual:
      isIndividualChecked.length == 0 ? "false" : isIndividualChecked,
    type: "view",
    key: "1662974432015",
    selectExecs: Salesexecutivename,
    saveSE: "true",
    optType: -1,
    quarter: -1,
    status: -1,
    duration2: -1,
    measures: -1,
    monthsel: -1,
    viewByTime: -1,
    fyear: -1,
    customers: -1,
    prospects: -1,
    practices: -1,
    countries: -1,
    customerType: -1,
    summary: -1,
    showBy: -1,
    aelocation: -1,
    engComp: -1,
    Divisions: -1,
    accOwner:
      softwarePayload.accOwner ===
      accountOwner.map((item) => item.value).join(",")
        ? -1
        : softwarePayload.accOwner,
    newCust: -1,
    accType: -1,
    entityId: "-1",
  };

  //------------------------methods---------------------------------

  const onFilterChange = ({ id, value }) => {
    setQdate(value);
    setFdate(value);

    setSoftwarePayload((prevState) => {
      return { ...prevState, [id]: value };
    });

    if (id == "entityId") {
      settargetDataPayload((prevState) => {
        return { ...prevState, [id]: value };
      });
      setviewDataPayload((prevState) => {
        return { ...prevState, [id]: value };
      });
      setwowDatapaylaod((prevState) => {
        return { ...prevState, [id]: value };
      });
    }

    let SelectSEData1 = SelectSEData.slice(0, -1);
    switch (value) {
      case "view":
        setSoftwarePayload((prevState) => {
          return {
            ...prevState,
            mode: "view",
            from: moment(quarterdate).format("YYYY-MM-DD"),
            duration: duration,
            vendors: vendor1,
            divisions: division,
            executives: salesEx == 1 ? executiveIdPayload : salesEx,
            salesId: salesexecutiveid,
            isIndividual:
              isIndividualChecked.length == 0 ? "false" : isIndividualChecked,
            type: "view",
            selectExecs: Salesexecutivename,
          };
        });
        break;

      case "target":
        setSoftwarePayload((prevState) => {
          return {
            ...prevState,
            mode: "edit",
            from: stDate,
            duration: "4",
            vendors: vendorData.map((item) => item.label).join(","),
            divisions: "-1",
            executives: salesEx == 1 ? SelectSEData1 : salesEx,
            isActive: "true",
            isIndividual:
              isIndividualChecked.length == 0 ? "false" : isIndividualChecked,
            type: "target",
            key: "1662978029003",
            selectExecs: SalesExecutiveNames,
            salesId: salesexecutiveid,
          };
        });

        break;
      case "wow":
        setSoftwarePayload((prevState) => {
          return {
            ...prevState,
            mode: "wow",
            from: moment(quarterdate).format("YYYY-MM-DD"),
            duration: duration,
            vendors: vendor1,
            divisions:
              division == undefined || division == null ? -1 : division,
            executives: salesEx == 1 ? formattedIds : salesEx,
            type: "wow",
            subType: "detail",
            isActive: "true",
            isIndividual:
              isIndividualChecked.length == 0 ? "false" : isIndividualChecked,
            saveSE: "false",
            selectExecs: "",
            showBy: showbyvalue,
          };
        });
    }

    if (id === "executives" && value === "1") {
      setVisible(true);
    }
  };

  const softwareSearchValidator = () => {
    setShowDetails(false);
    let payload = id != "-1" ? softwarePayload : viewDataPayload;
    let filteredData = ref.current.filter((d) => d != null);

    ref.current = filteredData;

    let valid = GlobalValidation(ref);

    if (valid == true) {
      setsearching(false);
      setErrorMsg(true);
    }

    if (valid) {
      return;
    }
    switch (actionSelector) {
      case "target":
        payload = targetDataPayload;
        break;

      case "view":
        payload = viewDataPayload;
        break;

      case "wow":
        payload = wowDataPayload;
        break;

      default:
        break;
    }
    payload.executives === "1"
      ? (payload.executives = String(
          JSON.parse(localStorage.getItem("selectedSELocal")).map((item) => {
            return item.id;
          })
        ))
      : "";
    payload.executives === "1"
      ? (payload.isActive = JSON.parse(
          localStorage.getItem("isIndividualCheckedLocal")
        ))
      : "";
    payload.customers === "1" &&
    (localStorage.getItem("selectedCust") === null ||
      localStorage.getItem("selectedCust") === undefined ||
      localStorage.getItem("selectedCust") === "[]")
      ? setErrorMsg(true)
      : getSoftwareData();
    setShowDetails(true);
  };

  // -----------------------calls----------------------------------
  const softwareSearchValidatorSavedSearch = () => {
    const payload = {
      mode: filterData?.mode,
      from: filterData.from,
      duration: filterData?.duration,
      vendors: filterData.vendors,
      divisions: filterData.divisions,
      executives: filterData.executives,
      salesId: filterData.salesId,
      isActive: filterData.isActive,
      isIndividual: filterData.isIndividual,
      type: filterData?.type,
      key: "1662974432015",
      selectExecs: filterData.selectExecs,
      saveSE: "true",
      optType: filterData.optType,
      quarter: filterData.quarter,
      status: filterData.status,
      duration2: filterData.duration2,
      measures: filterData.measures,
      monthsel: filterData.monthsel,
      viewByTime: filterData.viewByTime,
      fyear: filterData.fyear,
      customers: filterData.customers,
      prospects: filterData.prospects,
      practices: filterData.practices,
      countries: filterData.countries,
      customerType: filterData.customerType,
      summary: filterData.summary,
      showBy: filterData.showBy,
      aelocation: filterData.aelocation,
      engComp: filterData.engComp,
      Divisions: filterData.Divisions,
      accOwner: filterData.accOwner,
      newCust: filterData.newCust,
      accType: filterData.accType,
    };
    let filteredData = ref.current.filter((d) => d != null);

    ref.current = filteredData;

    let valid = GlobalValidation(ref);

    if (valid == true) {
      setsearching(false);
      setErrorMsg(true);
    }

    if (valid) {
      return;
    }

    payload.executives === "1"
      ? (payload.executives = String(
          JSON.parse(localStorage.getItem("selectedSELocal")).map((item) => {
            return item.id;
          })
        ))
      : "";
    payload.executives === "1"
      ? (payload.isActive = JSON.parse(
          localStorage.getItem("isIndividualCheckedLocal")
        ))
      : "";
    payload.customers === "1" &&
    (localStorage.getItem("selectedCust") === null ||
      localStorage.getItem("selectedCust") === undefined ||
      localStorage.getItem("selectedCust") === "[]")
      ? setErrorMsg(true)
      : getSoftwareDataSavedSearch();
    setShowDetails(true);
  };
  useEffect(() => {
    dispatch(updateSfId(salesEx));
  }, [salesEx]);
  const getSoftwareDataSavedSearch = () => {
    setLoader(true);
    const payload = {
      mode: filterData?.mode,
      from: filterData?.from,
      duration: filterData?.duration,
      vendors: filterData?.vendors,
      divisions: filterData?.divisions,
      executives: filterData?.executives,
      salesId: filterData.salesId,
      isActive: filterData?.isActive,
      isIndividual: filterData?.isIndividual,
      type: filterData?.type,
      key: "1662974432015",
      selectExecs: filterData?.selectExecs,
      saveSE: "true",
      optType: filterData?.optType,
      quarter: filterData?.quarter,
      status: filterData?.status,
      duration2: filterData?.duration2,
      measures: filterData.measures,
      monthsel: filterData?.monthsel,
      viewByTime: filterData?.viewByTime,
      fyear: filterData?.fyear,
      customers: filterData?.customers,
      prospects: filterData?.prospects,
      practices: filterData?.practices,
      countries: filterData?.countries,
      customerType: filterData?.customerType,
      summary: filterData?.summary,
      showBy: filterData?.showBy,
      aelocation: filterData?.aelocation,
      engComp: filterData?.engComp,
      Divisions: filterData?.Divisions,
      accOwner: filterData?.accOwner,
      newCust: filterData?.newCust,
      accType: filterData?.accType,
    };

    setsearching(false);
    setErrorMsg(false);
    payload.executives === "1"
      ? (payload.executives = String(
          JSON.parse(localStorage.getItem("selectedSELocal")).map((item) => {
            return item.id;
          })
        ))
      : "";
    payload.customers === "1"
      ? (payload.customers = String(
          JSON.parse(localStorage.getItem("selectedCust")).map((item) => {
            return item.id;
          })
        ))
      : "";
    dispatch(updatedSalesExectiveId(payload?.executives));

    axios
      .post(baseUrl + `/SalesMS/software/getSalesSoftwareData`, payload)
      .then((resp) => {
        // logInfo("Authorization successfull","getSoftwareDataSavedSearch");
        setLoader(false);
        setTableTruth(true);
        const data = resp.data.data;
        const reportRunId = resp.data.reportRunId;
        if (actionSelector == "view" || filterData?.type == "view") {
          const allQuarter = data
            ?.filter((item) => item.lvl === 1)
            .map((item) => {
              return { quat: item.quarter, date: item.date };
            });
          const Date = allQuarter[0]?.quat; // Assuming allQuarter is an array of quarter strings
          const formattedDate = calculateStartDate(Date);
          const updatedDate = subtractYearFromDate(formattedDate);
          dispatch(updateQuaterDate(updatedDate));
          setEnableTable(true);
        }

        dispatch(setReportRunIdRedux(reportRunId));
        let array = [];
        switch (filterData?.type) {
          case "target":
            array = resp.data.swTargets?.split(",");
            break;
          case "view":
            array = [
              "id",
              "quarter",
              "executive",
              "execStatus",
              "country",
              "target",
              "oppAmount",
              "grossOppAmount",
              "calls",
              "grossCalls",
              "upside",
              "gap",
              "lvl",
              "closedAmount",
              "isActive",
              "grossClosedAmount",
            ];
            break;
          case "wow":
            array =
              filterData?.showBy === "week"
                ? [
                    "id",
                    "weekno",
                    "date",
                    "executive",
                    "execStatus",
                    "supervisor",
                    "target",
                    "oppAmount",
                    "calls",
                    "upside",
                    "gap",
                    "closedAmount",
                    "lvl",
                    "count",
                  ]
                : [
                    "id",
                    "executive",
                    "weekno",
                    "date",
                    "execStatus",
                    "target",
                    "oppAmount",
                    "clls",
                    "upside",
                    "gap",
                    "closedAmount",
                    "lvl",
                    "count",
                    "supervisor",
                  ];
            setwowtype(filterData?.showBy);
            break;

          default:
            break;
        }
        const newArray = data.map((item) => {
          let k = JSON.parse(JSON.stringify(item, array, 4));
          return k;
        });
        setSoftwareData(newArray);
        setreportRunId(reportRunId);
        setsearching(false);
        setWowDisplay(true);
        setViewDisplay(true);
        setShowDetails(true);

        setTargetDataKeys(resp.data.swTargets);
        setVisibleC(!visibleC);
        visibleC
          ? setCheveronIcon(FaChevronCircleUp)
          : setCheveronIcon(FaChevronCircleDown);
      })
      .catch((err) => {
        Utils.Log(err);
        // logError("Error during authorization", "getSoftwareDataSavedSearch");
      });
  };

  const getData1SavedSearch = () => {
    let valid = GlobalValidation(ref);

    if (valid == true) {
      setsearching(false);
      setErrorMsg(true);
    }
    setErrorMsg(false);
    setLoader(true);
    setButtonAction(false);
    let SelectSEData1 = SelectSEData.slice(0, -1);
    let date = "";

    const fromDate = filterData?.from; // Use provided date or stDate if id is null
    const fromDateObj = new Date(fromDate);

    // Add one year
    fromDateObj.setFullYear(fromDateObj.getFullYear());
    // Calculate the quarter month
    const currentMonth = fromDateObj.getMonth();
    if (currentMonth < 0 || currentMonth > 11) {
      // Handle invalid month, e.g., set it to January
      fromDateObj.setMonth(0);
    } else {
      const nextQuarterMonth = Math.ceil((currentMonth + 1) / 3) * 3;
      fromDateObj.setMonth(nextQuarterMonth);
    }

    const resultDate = fromDateObj.toISOString().slice(0, 10);
    date = resultDate;
    axios({
      method: "post",
      url: baseUrl + `/SalesMS/services/getSalesTargetsSW`,

      data: {
        mode: "edit",
        from: filterData.from,
        duration: "4",
        vendors:
          "AllSight,AWS,Azure,BIGID,Breakwater,Cleanslate,Collibra,Data Bricks,Data Sentinel,Data.World,DataRobot,dbt Labs,Denodo,DiscoverAlpha,EDB,Evolveware,HCL America Inc,IBM,IBM - IM&A,IBM - SI,IBM â€“ AWS,IBM â€“ Azure,IBM â€“ SI,IM&A Other SW,IM&A-Data Fabric,ImageAccess,Informatica,Intellective/Vega,Jedox,Manta,Manta MS Purview Bridge,Mendix,Meta Integration (Miti),Microsoft,MongoDB,MQAttach,MuleSoft,myInvenio,New Relic,Okta,OneTrust,Prolifics - Effecta/SLA/BA360,Prolifics - Jam/Panther/XMLink,Prolifics - PPMweb,Qlik,Quest,RedHat,Rocket,Senzing,SI - Other SW,Snowflake,SWOne,Talend,Testing Other (HP),Tricentis,UiPath,Unassigned",
        divisions: filterData?.divisions,
        executives: filterData.executives,
        isActive: "true",
        isIndividual: filterData.isIndividualChecked,
        type: "target",
        key: "1662978029003",
        selectExecs: filterData.selectExecs,
        salesId: filterData.salesId,
        saveSE: "true",
        customers: -1,
        prospects: -1,
        practices: -1,
        countries: -1,
        customerType: -1,
        summary: -1,
        showBy: -1,
        optType: -1,
        quarter: -1,
        status: -1,
        duration2: -1,
        monthsel: -1,
        viewByTime: -1,
        fyear: -1,
        aelocation: -1,
        engComp: -1,
        Divisions: -1,
        accOwner: filterData.accOwner,
        newCust: -1,
        accType: -1,
        measures: -1,
        entityId: selectedEntity.map((entity) => entity.value).toString(),
      },

      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // logInfo("Authorization successfull","getData1SavedSearch");
        const data = response.data;
        setTableData(data);
        setReportId(data.reportRunId);
        setHeaderData(data.summary[0]);
        setData(data.data);
        setTargetOpen(true);
        setLoader(false);
        setVisibleC(!visibleC);
        visibleC
          ? setCheveronIcon(FaChevronCircleUp)
          : setCheveronIcon(FaChevronCircleDown);
        setButtonAction(true);
      })
      .catch((error) => {
        // logError("Error during authorization", "getData1SavedSearch");
      });
  };

  // -----------------------calls----------------------------------

  const getvendor = () => {
    axios
      .get(baseUrl + "/CommonMS/master/getSalesVendors")
      .then((resp) => {
        // logInfo("Authorization  successfull salesVendors","getvendor");
        const data = resp.data;
        const dropdownOptions = data.map((item) => {
          return {
            value: item,
            label: item,
          };
        });
        setvendorDropdown(dropdownOptions);
        setselectedvendor(dropdownOptions);
        setwowDatapaylaod((prevState) => {
          return {
            ...prevState,
            ["vendors"]: String(dropdownOptions.map((item) => item.value)),
          };
        });
        setviewDataPayload((prevState) => {
          return {
            ...prevState,
            ["vendors"]: String(dropdownOptions.map((item) => item.value)),
          };
        });
        settargetDataPayload((prevState) => {
          return {
            ...prevState,
            ["vendors"]: String(dropdownOptions.map((item) => item.value)),
          };
        });
      })
      .catch((err) => {
        Utils.Log(err);
        //  logError("Error during authorization", "getvendor");
      });
  };

  const getsalesExecutiveDropdown = () => {
    axios
      .get(baseUrl + "/SalesMS/MasterController/salesExecutiveData")
      .then((resp) => {
        //  logInfo("Authorization successfull salesExecutiveData","getsalesExecutiveDropdown");
        const data = resp.data;
        const dropdownOptions = data
          .filter(
            (item) =>
              item.isActive === 1 &&
              item.lkupName !== "<< Active SE >>" &&
              item.lkupName !== "<< InActive SE >>" &&
              item.lkupName !== "<< All SE >>"
          )
          .map((item) => (
            <option key={item.id} value={item.val}>
              {item.lkupName}
            </option>
          ));
        setsalesExecutiveDropdown(dropdownOptions);
      })
      .catch((err) => {
        Utils.Log(err);
        //  logError("Error during authorization", "getsalesExecutiveDropdown");
        // new modifications
      });
  };
  const handleAbort = () => {
    abortController.current && abortController.current.abort();
    // logWarn("ongoing request aborted","handleAbort");
    setLoader(false);
  };
  const getSFOwnerDivisionsDropdown = () => {
    axios
      .get(baseUrl + `/SalesMS/MasterController/SFOwnerDivisions`)
      .then((resp) => {
        // logInfo("Authorization successfull SFOwnerDivisions","getSFOwnerDivisionsDropdown");
        const data = resp.data;
        const dropdownOptions = data.map((item) => {
          return {
            value: item.id,
            label: item.owner_Division,
          };
        });
        setSFOwnerDivisionsDropdown(dropdownOptions);
        setselectesFOwnerDivison(dropdownOptions);
        setwowDatapaylaod((prevState) => {
          return {
            ...prevState,
            ["divisions"]: String(dropdownOptions.map((item) => item.value)),
          };
        });
        setviewDataPayload((prevState) => {
          return {
            ...prevState,
            ["divisions"]: String(dropdownOptions.map((item) => item.value)),
          };
        });
        settargetDataPayload((prevState) => {
          return {
            ...prevState,
            ["divisions"]: String(dropdownOptions.map((item) => item.value)),
          };
        });
      })
      .catch((err) => {
        Utils.Log(err);
        // logError("Error during authorization", "getSFOwnerDivisionsDropdown");
      });
  };

  const quarterToMonth = {
    Q1: "04",
    Q2: "07",
    Q3: "10",
    Q4: "01",
  };

  function calculateStartDate(quarterString) {
    const match = quarterString?.match(/^(\d{4})-Q(\d)$/);
    if (match) {
      let year = parseInt(match[1], 10);
      const quarter = parseInt(match[2], 10);

      // Handle Q4, incrementing the year
      if (quarter === 4) {
        year++;
      }

      const month = quarterToMonth[`Q${quarter}`];
      const day = "01";
      return `${year}-${month}-${day}`;
    }
    return null; // Handle invalid input gracefully
  }

  function subtractYearFromDate(dateString) {
    const currentDate = new Date(dateString);
    currentDate.setUTCFullYear(currentDate.getUTCFullYear() - 1);

    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const userRoles = () => {
    axios({
      method: "GET",
      url:
        baseUrl +
        `/timeandexpensesms/ShiftAllownces/getuserroleid?user_id=${loggedUserId}`,
    })
      .then((resp) => {
        // logInfo("Authorization successfull","userRoles");
        const data = resp.data;
        const salesAccess = data[0].role_type_id.includes("920") && 920;
        setSalesfullAccess(salesAccess);
      })
      .catch((error) => {
        // logError("Error during authorization", "userRoles");
      });
  };
  useEffect(() => {
    userRoles();
  }, []);
  const [openTablesSf, setOpenTableSf] = useState(false);

  useEffect(() => {
    setSoftwarePayload((prevVal) => ({
      ...prevVal,
      executives: executiveIdPayload, // Assuming 'from' key directly sets the date object
    }));
  }, [executiveIdPayload]);

  const getSoftwareData = () => {
    setOpenTableSf(false);
    let payload = id !== "-1" ? { ...softwarePayload } : { ...viewDataPayload };

    switch (actionSelector) {
      case "target":
        payload =
          id !== "-1" ? { ...softwarePayload } : { ...targetDataPayload };
        break;
      case "view":
        payload = id !== "-1" ? { ...softwarePayload } : { ...viewDataPayload };
        break;
      case "wow":
        payload = id !== "-1" ? { ...softwarePayload } : { ...wowDataPayload };
        break;
      default:
        break;
    }

    const selectedEntityIds = selectedEntity
      .map((entity) => entity.value)
      .toString();

    payload = {
      ...payload,
      entityId: selectedEntityIds,
    };

    setsearching(false);
    setErrorMsg(false);
    if (payload?.executives === "1") {
      const selectedSELocal = JSON.parse(
        localStorage.getItem("selectedSELocal")
      );
      payload.executives = String(selectedSELocal.map((item) => item.id));
    }

    if (payload.customers === "1") {
      const selectedCust = JSON.parse(localStorage.getItem("selectedCust"));
      payload.customers = String(selectedCust.map((item) => item.id));
    }
    if (payload.divisions == undefined || payload.divisions == null) {
      payload.divisions = -1;
    }
    if (payload.duration == undefined || payload.duration == null) {
      payload.duration = 4;
    }

    if (payload.vendors == undefined || payload.vendors == null) {
      payload.vendors = vendor1;
    }

    dispatch(updatedSalesExectiveId(payload?.executives));
    setSoftwarePayload((prevVal) => ({
      ...prevVal,
      executives: payload?.executives, // Assuming 'from' key directly sets the date object
    }));

    axios
      .post(baseUrl + `/SalesMS/software/getSalesSoftwareData`, payload)
      .then((resp) => {
        // logInfo("Authorization successfull","getSoftwareData");
        setLoader(false);
        setTableTruth(true);
        const data = resp.data.data;
        const reportRunId = resp.data.reportRunId;
        if (actionSelector == "view") {
          const allQuarter = data
            ?.filter((item) => item.lvl === 1)
            .map((item) => ({ quat: item.quarter, date: item.date }));

          const firstQuarter = allQuarter[0]?.quat; // Assuming allQuarter is an array of quarter strings
          const formattedDate = calculateStartDate(firstQuarter);
          const updatedDate = subtractYearFromDate(formattedDate);
          dispatch(updateQuaterDate(updatedDate));
          setEnableTable(true);
        }

        if (actionSelector === "view" || actionSelector === "wow") {
          setOpenTableSf(true);
        }

        dispatch(setReportRunIdRedux(reportRunId));

        let array = [];
        switch (actionSelector) {
          case "target":
            array = resp.data.swTargets?.split(",");
            break;
          case "view":
            array = [
              "id",
              "quarter",
              "executive",
              "execStatus",
              "country",
              "target",
              "oppAmount",
              "grossOppAmount",
              "calls",
              "grossCalls",
              "upside",
              "gap",
              "lvl",
              "closedAmount",
              "isActive",
              "grossClosedAmount",
            ];
            break;
          case "wow":
            array =
              wowDataPayload.showBy === "week"
                ? [
                    "id",
                    "weekno",
                    "date",
                    "executive",
                    "execStatus",
                    "supervisor",
                    "target",
                    "oppAmount",
                    "calls",
                    "upside",
                    "gap",
                    "closedAmount",
                    "lvl",
                    "count",
                  ]
                : [
                    "id",
                    "executive",
                    "weekno",
                    "date",
                    "execStatus",
                    "target",
                    "oppAmount",
                    "clls",
                    "upside",
                    "gap",
                    "closedAmount",
                    "lvl",
                    "count",
                    "supervisor",
                  ];
            setwowtype(wowDataPayload.showBy);
            break;
          default:
            break;
        }

        const newArray = data.map((item) =>
          JSON.parse(JSON.stringify(item, array, 4))
        );
        setSoftwareData(newArray);
        setreportRunId(reportRunId);
        setsearching(false);
        setWowDisplay(true);
        setViewDisplay(true);
        setTargetDataKeys(resp.data.swTargets);
        setVisibleC(!visibleC);
        visibleC
          ? setCheveronIcon(FaChevronCircleUp)
          : setCheveronIcon(FaChevronCircleDown);
      })
      .catch((err) => {
        // logError("Error during authorization", "getSoftwareData");
      });
  };

  //-------------------SF Refresh-------------------------
  const reportRunIdRedux = useSelector(
    (state) => state.selectedSEState.reportRunId
  );
  const sfId = useSelector((state) => state.selectedSEState.sfId);
  const sfDate = useSelector((state) => state.selectedSEState.sfDate);
  const sfNeglatedData = useSelector(
    (state) => state.selectedSEState.sfNeglatedData
  );

  const ownerDivisions = useSelector(
    (state) => state.selectedSEState.ownerDivisions
  );
  let OwnerValues = ""; // Initialize OwnerValues as a default value

  if (Array.isArray(ownerDivisions)) {
    // Check if ownerDivisions is an array
    OwnerValues = ownerDivisions.map((item) => item.value).join(",");
  }
  const [ownerDivison, setOwnerDiviosn] = useState(OwnerValues);

  useEffect(() => {
    dispatch(updateSoftwarePayload(softwarePayload));
  }, [softwarePayload]);
  const getviewDetailsData = () => {
    setLoader(false);
    axios({
      method: "post",
      url: baseUrl + `/SalesMS/software/getSalesSoftwareDataDetails`,
      data: {
        executives: sfId == undefined || sfId === "1" ? -1 : sfId,
        from: moment(sfDate).format("YYYY-MM-DD"),
        type: "view",
        detail: true,
        reportRunId: reportRunIdRedux,
        optType: sfNeglatedData,
        vendors: vendor1,
        saveSE: false,
        divisions: ownerDivison,
        mode: -1,
        duration: -1,
        measures: -1,
        customers: -1,
        prospects: -1,
        practices: -1,
        countries: -1,
        customerType: -1,
        summary: -1,
        showBy: "-1",
        quarter: -1,
        status: -1,
        duration2: -1,
        monthsel: -1,
        viewByTime: -1,
        fyear: -1,
        aelocation: -1,
        engComp: -1,
        Divisions: -1,
        accOwner: -1,
        newCust: -1,
        accType: -1,
        entityId: selectedEntity.map((entity) => entity.value).toString(),
      },
    })
      .then((resp) => {
        //  logInfo("Authorization successfull","getviewDetailsData");
        const data = resp.data.data;
        const array = [
          "id",
          "executive_division",
          "execStatus",
          "supervisor",
          "customerId",
          "customer",
          "isProspect",
          "oppId",
          "sfOppId",
          "opportunity",
          "vendor",
          "probability",
          "closeDate",
          "oppAmount",
          "calls",
          "upside",
          "closedAmount",
          "week",
          "comments",
          "lvl",
          "count",
          "isEdit",
          "isDeleted",
          "keyAttr",
          "parentAttr",
          "add_to_call",
          "isActive",
        ];
        const newArray = data.map((item) => {
          let k = JSON.parse(JSON.stringify(item, array, 4));
          return k;
        });
        const allcust = newArray
          .filter((item) => item.lvl === 1)
          .map((item) => item.customer);
        dispatch(updateSfViewData(newArray));
        dispatch(updateSfCust(allcust));
        setLoader(false);
        window.scrollTo({
          top: 450,
          behavior: "smooth", // This adds a smooth scrolling effect, optional
        });
      })
      .catch((resp) => {
        //  logError("Error during authorization", "getviewDetailsData");
      });
  };

  const getserviceData = () => {
    const loaderTime = setTimeout(() => {
      setLoader(true);
    }, 2000);
    abortController.current = new AbortController();
    axios({
      method: "post",
      url: baseUrl + `/SalesMS/salesforce/refreshSalesForceData`,
      signal: abortController.current.signal,
      data: {
        reportRunId: "" + reportRunIdRedux,
        for: "Software",
      },
    })
      .then((resp) => {
        // logInfo("Authorization successfull refreshSalesForceData","getserviceData");
        const data = resp.data.data;
        setLoader(false);
        clearTimeout(loaderTime);
        getviewDetailsData();
      })
      .catch((err) => {
        Utils.Log(err);
        //  logError("Error during authorization refreshSalesForceData","getserviceData");
      });
  };
  //===========================================================
  const getData1 = () => {
    let valid = GlobalValidation(ref);

    if (valid == true) {
      setsearching(false);
      setErrorMsg(true);
    }
    setErrorMsg(false);
    setLoader(true);
    setButtonAction(false);
    let SelectSEData1 = SelectSEData.slice(0, -1);
    let date = "";
    if (id != "-1") {
      const fromDate = filterData?.from; // Use provided date or stDate if id is null
      const fromDateObj = new Date(fromDate);

      // Add one year
      fromDateObj.setFullYear(fromDateObj.getFullYear());
      // Calculate the quarter month
      const currentMonth = fromDateObj.getMonth();
      if (currentMonth < 0 || currentMonth > 11) {
        // Handle invalid month, e.g., set it to January
        fromDateObj.setMonth(0);
      } else {
        const nextQuarterMonth = Math.ceil((currentMonth + 1) / 3) * 3;
        fromDateObj.setMonth(nextQuarterMonth);
      }
      const resultDate = fromDateObj.toISOString().slice(0, 10);
      date = resultDate;
    }

    let salesExId;
    let id4;

    if (typeof salesEx === "string") {
      salesExId = salesEx.replace(/,\s*$/, "");
    } else {
      salesExId = salesEx;
    }

    if (typeof SelectSEData1 === "string") {
      id4 = SelectSEData1.replace(/,\s*$/, "");
    } else {
      id4 = SelectSEData1;
    }

    axios({
      method: "post",
      url: baseUrl + `/SalesMS/services/getSalesTargetsSW`,

      data: {
        mode: "edit",
        from: stDate,
        duration: "4",
        vendors:
          "AllSight,AWS,Azure,BIGID,Breakwater,Cleanslate,Collibra,Data Bricks,Data Sentinel,Data.World,DataRobot,dbt Labs,Denodo,DiscoverAlpha,EDB,Evolveware,HCL America Inc,IBM,IBM - IM&A,IBM - SI,IBM â€“ AWS,IBM â€“ Azure,IBM â€“ SI,IM&A Other SW,IM&A-Data Fabric,ImageAccess,Informatica,Intellective/Vega,Jedox,Manta,Manta MS Purview Bridge,Mendix,Meta Integration (Miti),Microsoft,MongoDB,MQAttach,MuleSoft,myInvenio,New Relic,Okta,OneTrust,Prolifics - Effecta/SLA/BA360,Prolifics - Jam/Panther/XMLink,Prolifics - PPMweb,Qlik,Quest,RedHat,Rocket,Senzing,SI - Other SW,Snowflake,SWOne,Talend,Testing Other (HP),Tricentis,UiPath,Unassigned",
        divisions: division,
        // executives: "-2",
        executives: salesExId == 1 ? id4 : salesExId,
        isActive: "true",
        isIndividual:
          isIndividualChecked.length == 0 ? "false" : isIndividualChecked,
        type: "target",
        key: "1662978029003",
        selectExecs: SalesExecutiveNames,
        salesId: salesexecutiveid,
        saveSE: "true",
        customers: -1,
        prospects: -1,
        practices: -1,
        countries: -1,
        customerType: -1,
        summary: -1,
        showBy: -1,
        optType: -1,
        quarter: -1,
        status: -1,
        duration2: -1,
        monthsel: -1,
        viewByTime: -1,
        fyear: -1,
        aelocation: -1,
        engComp: -1,
        Divisions: -1,
        accOwner: softwarePayload.accOwner,
        newCust: -1,
        accType: -1,
        measures: -1,
        entityId: selectedEntity.map((entity) => entity.value).toString(),
      },
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        //  logInfo("Authorization successfull  SalesTargetsSW","getData1");
        const data = response.data;
        setTableData(data);
        setReportId(data.reportRunId);
        setHeaderData(data.summary[0]);
        setData(data.data);
        setTargetOpen(true);
        setLoader(false);
        !valid && setVisibleC(!visibleC);
        visibleC
          ? setCheveronIcon(FaChevronCircleUp)
          : setCheveronIcon(FaChevronCircleDown);
        setButtonAction(true);
      })
      .catch((error) => {
        // logError("Error during authorization", "getData1");
      });
  };

  // -----------------------------useEffect---------------------------------
  useEffect(() => {
    getsalesExecutiveDropdown();
    getSFOwnerDivisionsDropdown();
    getvendor();
  }, []);

  useEffect(() => {
    setSelector(actionSelector);
  }, [softwareData]);
  const [errormessage, setErrorMessage] = useState(false);
  const HelpPDFName = "SW Plan and Review.pdf";
  const Headername = "S/W Plan and Review Help";

  const resetFilters = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    date.setMonth(date.getMonth() - 3);
    // Reset the values of all filters to their initial values here
    setStartDate(date); // Reset start date to initial value
    setFinancialYearDate(oneYearLater);

    const data = -2;

    setSelectedSEVal(data); // Reset selected sales executive value to initial value
    setSelectedp1(resetVendor);
    setselectedSE("<< All SE >>");
    setSalesEx(data);
    // setVendor1(
    //   "AllSight,AWS,Azure,BIGID,Boomi,Breakwater,Cleanslate,Collibra,Cyberark,Data Bricks,Data Sentinel,Data.World,DataRobot,dbt Labs,Delinea,Denodo,DiscoverAlpha,EDB,Evolveware,HCL America Inc,IBM,IBM - IM&A,IBM - SI,IBM â€“ AWS,IBM â€“ Azure,IBM â€“ SI,IM&A Other SW,IM&A-Data Fabric,ImageAccess,Informatica,Intellective/Vega,Jedox,Manta,Manta MS Purview Bridge,Mendix,Meta Integration (Miti),Microsoft,MongoDB,MQAttach,MuleSoft,myInvenio,New Relic,Okta,OneTrust,Prolifics - Effecta/SLA/BA360,Prolifics - PPMweb,Qlik,Quest,RedHat,Rocket,Senzing,SI - Other SW,Snowflake,SoftwareAG,SWOne,Talend,Testing Other (HP),Tricentis,UiPath,Unassigned"
    // );
    let valuesString = p1data.map((item) => item.value).join(",");

    setVendor1(valuesString);

    setselectesFOwnerDivison(sFOwnerDivisionsDropdown);
    const dropdown = sFOwnerDivisionsDropdown.label;
    setDivision(dropdown);
  };

  const [dropdownValue, setDropdownValue] = useState(0);
  const [defaultdata, setDefaultData] = useState([]);
  const [linkColumnsRoutes, setLinkColumnsRoutes] = useState([]);
  const [defaultFiltersdata, setDefaultFiltersData] = useState([]);
  const [editDefaultName, setEditDefaultName] = useState(false);
  const [editDefaultData, setEditDefaultData] = useState("");
  const [autoExecute, setAutoExecute] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [iconClick, setIconClick] = useState(false);
  const [editValidation, setEditValidation] = useState(false);
  const [deleteSavedSearchValid, setDeleteSavedSearchValid] = useState(false);
  const [newSavedSearchValid, setNewSavedSearchValid] = useState(false);
  const [validMessageSavedSearch, setValidMessageSavedSearch] = useState(false);
  const initialItem = defaultFiltersdata?.find((item) => item.state === 1);

  const [selectedFilter, setSelectedFilter] = useState(
    initialItem?.search_name !== ""
      ? initialItem?.search_name
      : sessionStorage.getItem("selectedFilter") || ""
  );

  const dropdownRef = useRef(null);
  const [defaultState, setDefaultState] = useState("");
  const [listItem, setListItem] = useState("");

  const getDefaultData = () => {
    axios
      .get(
        baseUrl +
          `/dashboardsms/savedsearch/getDefaultSearch?resourceId=${loggedUserId}&screenName=${currentScreenName.toString()}`
      )
      .then((res) => {
        //  logInfo("Authorization successfull","getDefaultData");
        const GetData = res.data;
        setDefaultData(GetData);
        let linkRoutes = ["/vendor/vendorDoc/:id", "/vendor/reviews/:id"];
        setLinkColumnsRoutes(linkRoutes);
        axios({
          method: "get",
          url: `${baseUrl}/dashboardsms/savedsearch/FiltersData?saved_search_id=${GetData.default_search_filter_Id}`,
        })
          .then((res) => {
            // logInfo("Authorization successfull","getDefaultData");
            const getData = res.data;
            setFilterData(getData);
          })
          .catch((error) => {
            Utils.Log("Error fetching filter data:", error);
            // logError("Error during authorization", "getDefaultData");
          });
      })
      .catch((error) => {
        Utils.Log("Error fetching default search data:", error);
        // logError("Error during authorization", "getDefaultData");
      });
  };

  const getAutoExecute = () => {
    axios
      .get(
        baseUrl +
          `/dashboardsms/savedsearch/getAutoExecute?resourceId=${loggedUserId}&pageName=Software Plan Review&state=1`
      )
      .then((res) => {
        // logInfo("Authorization successfull dashboardsms ","getAutoExecute");
        const GetData = res.data;
        setDefaultState(GetData);
      })
      .catch((error) => {
        Utils.Log("Error fetching default search data:", error);
        // logError("Error during authorization dashboardsms", "getAutoExecute");
      });
  };

  const LinkTemplateName = () => {
    const id = defaultdata?.default_search_filter_Id;
    if (id == 0) {
      const parts = defaultdata?.page_url?.split("/");
      const lastTwoParts =
        parts?.length >= 2 ? parts?.slice(-2).join("/") : url;
      const baseUrl = "/search/savedSearches";
      const modifiedUrl = lastTwoParts.replace(new RegExp(`^${baseUrl}`), "");
      const urlWithHash = `/#/${modifiedUrl}`;
      const updatedUrlWithHash = `${urlWithHash}?id=${-1}`;
      window.location.href = updatedUrlWithHash;
    } else {
      const parts = defaultdata?.page_url?.split("/");
      const lastTwoParts =
        parts?.length >= 2 ? parts?.slice(-2).join("/") : url;
      const baseUrl = "/search/savedSearches";
      const modifiedUrl = lastTwoParts.replace(new RegExp(`^${baseUrl}`), "");
      const id = defaultdata.default_search_filter_Id;
      const urlWithHash = `/#/${modifiedUrl}`;
      const updatedUrlWithHash = `${urlWithHash}?id=${id}`;
      window.location.href = updatedUrlWithHash;
    }
  };

  useEffect(() => {
    if (Object.keys(defaultdata).length !== 0) {
      LinkTemplateName();
    }
  }, [defaultdata]);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear(); // Use getFullYear() to get the current year
    const quarter = Math.floor((today.getMonth() + 3) / 3); // Calculate current quarter
    const startMonth = (quarter - 1) * 3; // Start month of the quarter (0-indexed)
    const startDate = new Date(year, startMonth, 1); // Start date of the quarter
    const formattedStartDate = startDate.toISOString().slice(0, 10);
    const quarterString = `quarter ${formattedStartDate}`;
    setQuarterDate(startDate);

    if (softwarePayload.type == "target") {
      setSoftwarePayload((prevVal) => ({
        ...prevVal,
        from: moment(stDate).format("YYYY-MM-DD"), // Assuming 'from' key directly sets the date object
      }));
    } else {
      setSoftwarePayload((prevVal) => ({
        ...prevVal,
        from: moment(startDate).format("YYYY-MM-DD"), // Assuming 'from' key directly sets the date object
      }));
    }
  }, [selectFilter]);

  useEffect(() => {
    const initialItem = defaultFiltersdata.find((item) => item.state === 1);
    if (initialItem) {
      setSelectedFilter(initialItem.search_name);
    } else if (defaultFiltersdata.length == 2 && !initialItem) {
      setSelectedFilter("<< Default View >>");
    } else if (initialItem == "Undefined") {
      setSelectedFilter("<< Default View >>");
    }
  }, [defaultFiltersdata]);

  useEffect(() => {
    getDefaultData();
    getAutoExecute();
  }, []);

  useEffect(() => {
    getDefaultFiltersData();
  }, []);

  const LinkTemplateName1 = () => {
    const parts = defaultState?.page_url?.split("/");
    const lastTwoParts = parts?.length >= 2 ? parts?.slice(-2).join("/") : url;
    const baseUrl = "/search/savedSearches";
    const modifiedUrl = lastTwoParts.replace(new RegExp(`^${baseUrl}`), "");
    const id = defaultState?.id;
    const urlWithHash = `/#/${modifiedUrl}`;
    const updatedUrlWithHash = `${urlWithHash}?id=${id}`;
    window.location.href = updatedUrlWithHash;
    if (
      (listItem.state == 1 && defaultState.state == 1) ||
      (listItem.state == undefined && defaultState.state == 1)
    ) {
      if (id != "-1" && filterData.type != "target" && softwarePayload) {
        setTimeout(() => {
          softwareSearchValidatorSavedSearch();
        }, 3000);
      }
      if (id != "-1" && filterData.type == "target" && softwarePayload) {
        setTimeout(() => {
          getData1SavedSearch();
        }, 3000);
      }
    }
  };

  useEffect(() => {
    if (listItem?.state !== undefined) {
      setDropdownValue(listItem.state);
    }
  }, [listItem]);

  useEffect(() => {
    if (defaultState && Object.keys(defaultState).length !== 0) {
      if (selectedFilter !== "<< New >>") {
        LinkTemplateName1();
      }
    }
  }, [defaultState, selectedFilter, filterData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedFilter) {
      handleSave();
      setIsOpen(false);
    }
  }, [selectedFilter]);

  const getDefaultFiltersData = () => {
    axios
      .get(
        baseUrl +
          `/dashboardsms/savedsearch/getSoftwarePlanAndReview?user_id=${loggedUserId}`
      )
      .then((res) => {
        //  logInfo("Authorization successfull SoftwarePlanAndReview","getDefaultFiltersData");
        let GetData = res.data;

        const defaultView = GetData.find((item) => item.id === -1);
        const newView = GetData.find((item) => item.id === 0);

        GetData = GetData.filter((item) => item.id !== -1 && item.id !== 0);

        if (defaultView) GetData.push(defaultView);
        if (newView) GetData.push(newView);

        setDefaultFiltersData(GetData);
      })
      .catch((error) => {
        // logError("Error during authorization SoftwarePlanAndReview","getDefaultFiltersData");
      });
  };

  const result = defaultFiltersdata.find(
    (item) => item.search_name === selectedFilter
  );

  const handleSave = () => {
    axios({
      method: "post",
      data: {
        pageName: result?.page_name,
        defaultSearchFilterId: result?.id,
        searchFilterName: result?.search_name,
        resourceId: result?.user_id,
        screenName: currentScreenName.toString(),
        pageUrl: result?.page_url,
      },
      url: baseUrl + `/dashboardsms/savedsearch/postDefaultSearch`,
    })
      .then((res) => {
        // logInfo("Authorization successfull postDefaultSearch ","handleSave");
        setConfirmMessage(true);
        setTimeout(() => {
          setConfirmMessage(false);
          getDefaultData();
          LinkTemplateName();
        }, 2000);
      })
      .catch((error) => {
        // logError("Error during authorization", "handleSave");
      });
  };

  const deleteFilters = async (id) => {
    try {
      await axios({
        method: "delete",
        url: `${baseUrl}/dashboardsms/savedsearch/deletedataSearchFilters?saved_search_id=${id}`,
      });
      await axios({
        method: "delete",
        url: `${baseUrl}/dashboardsms/savedsearch/deletedataSavedSearch?id=${id}`,
      });
      getDefaultFiltersData();
      getDefaultData();
    } catch (error) {
      Utils.Log("Error deleting data:", error);
    }
  };

  const deleteDefaultFilter = async (id) => {
    try {
      axios({
        method: "delete",
        url: `${baseUrl}/dashboardsms/savedsearch/deleteDefaultFilter?default_search_filter_Id=${id}`,
      });
      getDefaultFiltersData();
      getDefaultData();
    } catch (error) {
      Utils.Log("Error deleting data:", error);
    }
  };

  const deletedata = async (id) => {
    deleteDefaultFilter(id);
    deleteFilters(id);
    setDeleteSavedSearchValid(true);
    setTimeout(() => {
      setDeleteSavedSearchValid(false);
    }, 3000);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterSelect = (filterName) => {
    setSelectedFilter(filterName);
  };

  const handleAutoExecute = (filterName) => {
    setSelectedFilter(filterName);
    setAutoExecute(true);
  };

  sessionStorage.setItem(
    "selectedFilter",
    defaultdata?.default_search_filter_name
  );

  const [editDefaultNameChange, setEditDefaultNameChange] = useState(
    editDefaultData?.search_name
  );

  // const selectedFilter = sessionStorage.getItem("selectedFilter");

  useEffect(() => {
    setEditDefaultNameChange(editDefaultData?.search_name || "");
  }, [editDefaultData]);

  const handleSaveClick = () => {
    const payload = {
      searchName: editDefaultNameChange,
      id: editDefaultData.id,
      state: dropdownValue,
      pageName: editDefaultData?.page_name,
    };

    axios
      .post(
        baseUrl +
          `/dashboardsms/savedsearch/editSearchData?userId=${editDefaultData.user_id}`,
        payload
      )
      .then((response) => {
        logInfo("Authorization successfull editSearchData", "handleSaveClick");
        getDefaultFiltersData();
        setEditDefaultName(false);
      })
      .catch((error) => {
        Utils.Log("Error:", error);
        // logError("Error during authorization editSearchData", "handleSaveClick");
      });
  };

  const handleFiltersSaveClick = () => {
    const updatedFormData = {
      ...softwarePayload,
      searchName: editDefaultNameChange,
    };
    axios
      .post(
        baseUrl +
          `/dashboardsms/savedsearch/editFiltersData?savedSearchId=${editDefaultData?.id}`,
        updatedFormData
      )
      .then((response) => {
        // logInfo("Authorization successfull ","handleFiltersSaveClick");
        getDefaultFiltersData();
        setEditDefaultName(false);
      })
      .catch((error) => {
        Utils.Log("Error:", error);
        // logError("Error during authorization ", "handleFiltersSaveClick");
      });
  };

  const handleCombinedClick = () => {
    handleSaveClick();
    handleFiltersSaveClick();
    setEditValidation(true);
    setTimeout(() => {
      setEditValidation(false);
    }, 3000);
  };

  const handleInputChange = (event) => {
    setEditDefaultNameChange(event.target.value);
  };

  const filtersVisibility1 = () => {
    setVisibleC(false);
  };

  return (
    <div>
      {loader ? <Loader handleAbort={handleAbort} /> : ""}

      {editValidation && (
        <div className="statusMsg success">
          <span>
            <BiCheck
              size="1.4em"
              color="green"
              strokeWidth={{ width: "100px" }}
            />{" "}
            Changes have been made successfully.{" "}
          </span>
        </div>
      )}

      {newSavedSearchValid && (
        <div className="statusMsg success">
          <span>
            <BiCheck
              size="1.4em"
              color="green"
              strokeWidth={{ width: "100px" }}
            />{" "}
            New saved search filter added successfully.
          </span>
        </div>
      )}
      {deleteSavedSearchValid && (
        <div className="statusMsg success">
          <span>
            <BiCheck
              size="1.4em"
              color="green"
              strokeWidth={{ width: "100px" }}
            />{" "}
            Saved search filter deleted successfully.
          </span>
        </div>
      )}

      {validMessageSavedSearch ? (
        <div className="statusMsg error">
          <span className="error-block">
            <AiFillWarning /> &nbsp;Please select valid values for highlighted
            fields
          </span>
        </div>
      ) : (
        ""
      )}

      <div className="col-md-12">
        <div className="pageTitle">
          <div className="childOne"></div>
          <div className="childTwo">
            <h2>S/W Plan and Review</h2>
          </div>
          <div className="childThree toggleBtns">
            {/* ----------------------------FOR SF Refresh----------------------*/}
            {openTablesSf == true &&
              (actionSelector == "view" || actionSelector == "wow") && (
                <>
                  {actionSelector == "view" && tableTruth ? (
                    <button
                      className="btn btn-primary disable-table-btn"
                      onClick={() => setEnableTable(!enableTable)}
                    >
                      {enableTable ? "Hide Sf Pipeline" : "Show Sf Pipeline"}
                    </button>
                  ) : (
                    ""
                  )}

                  <h2
                    onClick={() => {
                      getserviceData();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="ia_support_icons/refresh.png"
                      width="25"
                      height="20"
                      style={{ borderRadius: "17px" }}
                      alt="Refresh Icon"
                      title="SF Refresh"
                    />
                  </h2>
                </>
              )}

            {/* -------------------------------------------------------------- */}

            <div>
              <span>
                <div
                  className="Monthly-Revenue-Forecast-nav-dropdown dropdown"
                  ref={dropdownRef}
                >
                  <span className="dropdown-toggle" onClick={toggleDropdown}>
                    <span className="filter-value-container">
                      <BsFilterRight color="#15A7ea" size="1.5em" /> {""}
                      <span
                        className="default-value"
                        title={
                          selectedFilter ||
                          defaultdata?.default_search_filter_name
                        }
                      >
                        {selectedFilter ||
                          defaultdata?.default_search_filter_name}
                      </span>
                    </span>
                  </span>
                  {isOpen && (
                    <ul className="dropdown-menu">
                      {defaultFiltersdata.map((item) => (
                        <li onClick={() => setListItem(item)}>
                          <span
                            className="dropdown-text"
                            title={item.search_name}
                            onClick={() => {
                              handleFilterSelect(item.search_name);
                              setDefaultState(item.state);
                              if (item.state == 2) {
                                setEditDefaultName(true);
                                setEditDefaultData(item);
                              } else {
                                setEditDefaultName(false);
                              }
                            }}
                          >
                            {item.search_name}
                          </span>
                          <span className="icon-wrapper">
                            {item.state === 0 ? (
                              <RestartAltOutlinedIcon
                                title="Populate"
                                style={{ marginLeft: "6px" }}
                                className="icon save"
                                onClick={() => {
                                  handleFilterSelect(item.search_name);
                                }}
                              />
                            ) : item.state === 1 ? (
                              <AutoModeIcon
                                title="Start Up"
                                className="icon save"
                                src={AE}
                                onClick={() =>
                                  handleAutoExecute(item.search_name)
                                }
                              />
                            ) : item.state === 2 ? (
                              // <RestartAltOutlinedIcon
                              //   className="icon save"
                              //   title="Populate"
                              //   style={{ marginLeft: "6px" }}
                              //   onClick={() => {
                              //     setEditDefaultName(true);
                              //     setEditDefaultData(item);
                              //     handleFilterSelect(item.search_name);
                              //   }}
                              // />
                              ""
                            ) : (
                              ""
                            )}
                            {item.id == "-1" || item.id == "0" ? (
                              ""
                            ) : (
                              <FaPencilAlt
                                className="edit"
                                title="edit"
                                onClick={() => {
                                  filtersVisibility1();
                                  setEditDefaultName(true);
                                  setEditDefaultData(item);
                                  handleFilterSelect(item.search_name);
                                }}
                              />
                            )}

                            {item.id == "-1" || item.id == "0" ? (
                              ""
                            ) : (
                              <FaTrash
                                title="Delete"
                                className="icon delete"
                                onClick={() => deletedata(item.id)}
                              />
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </span>

              <span
                className="serchFilterText"
                title="Search Filters"
                onClick={() => {
                  setVisibleC(!visibleC);

                  visibleC
                    ? setCheveronIcon(FaChevronCircleUp)
                    : setCheveronIcon(FaChevronCircleDown);
                }}
              >
                {cheveronIcon}
              </span>
            </div>
            <GlobalHelp pdfname={HelpPDFName} name={Headername} />
          </div>
        </div>
      </div>

      <div>{}</div>

      {errorMsg ? (
        <div className="statusMsg error">
          {" "}
          <AiFillWarning /> Please select valid values for highlighted fields
        </div>
      ) : (
        ""
      )}
      {errormessage ? (
        <div className="statusMsg error">
          {" "}
          <AiFillWarning />
          No Modifications to Save
        </div>
      ) : (
        ""
      )}

      <div className="group customCard">
        <CCollapse visible={!visibleC}>
          <div className="group-content row">
            <div className="col-md-4 mb-2" id="execSelDiv">
              <div className="form-group row">
                <label className="col-5">Action</label>
                <span className="col-1 p-0">:</span>
                <span className={`col-6 `} style={{ height: "23px" }}>
                  <select
                    id="type"
                    value={actionSelector}
                    className="col-md-12 col-sm-12 col-xs-12 "
                    onChange={(e) => {
                      resetFilters();
                      setEnableTable(false);
                      setTableTruth(false);
                      onFilterChange(e.target);
                      setSelectFilter(e.target.value);
                      setActionSelector(e.target.value);
                      {
                        e.target.value === "";
                      }
                    }}
                  >
                    <option value={"target"}>{"Targets"}</option>
                    <option value={"view"}>{"View"}</option>
                    <option value={"wow"}>{"WoW"}</option>
                  </select>
                </span>
              </div>
            </div>

            <div className="col-md-4 mb-2" id="entityId">
              <div className="form-group row">
                <label className="col-5">Entity</label>
                <span className="col-1 p-0">:</span>
                <span className="col-6">
                  <MultiSelect
                    ArrowRenderer={ArrowRenderer}
                    id="entityId"
                    options={entity}
                    hasSelectAll={true}
                    isLoading={false}
                    shouldToggleOnHover={false}
                    disableSearch={false}
                    value={selectedEntity}
                    valueRenderer={generateDropdownLabel}
                    disabled={false}
                    onChange={(s) => {
                      setselectedEntity(s);
                      const selectedEntityIds = s.map((d) => d.value);
                      setEntityIds(selectedEntityIds.toString());
                      onFilterChange({
                        id: "entityId",
                        value: selectedEntityIds.toString(),
                      });
                    }}
                  />
                </span>
              </div>
            </div>

            <div className="col-md-4 mb-2" id="execSelDiv">
              <div className="form-group row">
                <label className="col-5 ">
                  Sales Executive{" "}
                  <span className="required error-text ml-1"> *</span>
                </label>
                <span className="col-1 p-0">:</span>
                <span className="col-6 textfield">
                  {accessData === 1000 ||
                  accessData === 500 ||
                  loggedUserId == 114598021 ||
                  salesfullAccess == 920 ? (
                    <select
                      id="executives"
                      className="col-md-12 col-sm-12 col-xs-12 text"
                      value={
                        selectedSEVal === "-2"
                          ? "-2"
                          : selectedSEVal == 1
                          ? selectedExe
                          : selectedSEVal
                          ? selectedExe
                          : ""
                      }
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        const selectedText =
                          e.target.options[e.target.selectedIndex].text;

                        onFilterChange(e.target);

                        if (selectedValue === "-2") {
                          setselectedSE("<< All SE >>");
                          setSelectedSEVal("-2");
                        } else if (parseInt(selectedValue) === 1) {
                          if (selectedExe?.length > 0) {
                            setselectedSE(selectedExe);
                            setSelectedSEVal("1");
                          } else {
                            setselectedSE(selectedText);
                            setSelectedSEVal(selectedValue);
                          }
                        } else {
                          setselectedSE(selectedText);
                          setSelectedSEVal(selectedValue);
                        }
                      }}
                      ref={(ele) => {
                        ref.current[1] = ele;
                      }}
                      // disabled={servicesPayload.summary === "Account Owner"}
                    >
                      {selectedSEVal !== "null" &&
                        parseInt(selectedSEVal) !== -2 &&
                        selectedSEVal &&
                        selectedExe?.length > 0 && (
                          <option value={selectedExe}>{selectedExe}</option>
                        )}

                      <option value="null">{"<< Please select >>"}</option>

                      <option value="-2">{"<< All SE >>"}</option>

                      {salesExecutiveDropdown}
                    </select>
                  ) : (
                    <select
                      id="executives"
                      className="text"
                      value={selectedSEVal}
                      onChange={(e) => {
                        onFilterChange({
                          id: "executives",
                          value: e.target.value,
                        });
                        setSelectedSEVal(e.target.value);
                        setSalesEx(e.target.value);
                        setViewSlesId(e.target.value);
                        setselectedSE(
                          e.target.options[e.target.selectedIndex].text
                        );
                      }}
                      ref={(ele) => {
                        ref.current[0] = ele;
                      }}
                    >
                      <option value={""}>{"<< Please select>> "}</option>
                      <option value="1">Select SE</option>
                    </select>
                  )}
                </span>
              </div>
            </div>

            <div className="col-md-4 mb-2" id="execSelDiv">
              <div className="clearfix"></div>
              <div className="form-group row">
                <label className="col-5">
                  {" "}
                  Account Owner{" "}
                  <span className="required error-text ml-1"> *</span>
                </label>
                <span className="col-1 p-0">&nbsp;:</span>
                <span
                  className="col-6 "
                  // style={{ paddingLeft: "2%", paddingRight: "0px" }}
                >
                  <div
                    className="multiselect"
                    ref={(ele) => {
                      ref.current[2] = ele;
                    }}
                  >
                    <MultiSelect
                      ArrowRenderer={ArrowRenderer}
                      id="accOwner"
                      options={accountOwner}
                      hasSelectAll={true}
                      isLoading={false}
                      shouldToggleOnHover={false}
                      disableSearch={false}
                      value={selectedAccountOwner}
                      valueRenderer={generateDropdownLabel}
                      disabled={false}
                      onChange={(s) => {
                        setSelectedAccountOwner(s);
                        let filteredCountry = [];
                        let filteredValues = [];
                        s.forEach((d) => {
                          filteredValues.push(d.value);
                        });
                        setSoftwarePayload((prevVal) => ({
                          ...prevVal,
                          ["accOwner"]: filteredValues.toString(),
                        }));
                      }}
                    />
                  </div>
                </span>
              </div>
            </div>

            {actionSelector === "target" && (
              <div className="col-md-4 mb-2">
                <div className="form-group row" id="week-picker-wrapper">
                  <label className="col-5">
                    Financial Year{" "}
                    <span className="required error-text ml-1"> *</span>
                  </label>
                  <span className="col-1 p-0">:</span>
                  <span
                    className="col-6 datepicker targetDatepicker"
                    ref={(ele) => {
                      ref.current[1] = ele;
                    }}
                  >
                    <DatePicker
                      id="startDate"
                      selected={FinancialYearDate}
                      onChange={(e) => {
                        const oneYearLater = new Date(
                          e.getFullYear() + 1,
                          e.getMonth(),
                          e.getDate()
                        );
                        setStartDate(e);
                        setFinancialYearDate(oneYearLater);
                        DateChange({
                          id: "from",
                          value: e.toLocaleDateString("en-CA"),
                        });
                        onFilterChange({
                          id: "from",
                          value: e.toLocaleDateString("en-CA"),
                        });
                      }}
                      dateFormat="'FY' yyyy"
                      showYearPicker
                      yearDropdownItemNumber={4}
                    />
                  </span>
                </div>
              </div>
            )}

            {(actionSelector === "view" || actionSelector === "wow") && (
              <div className="col-md-4 mb-2">
                <div className="form-group row">
                  <label className="col-5">
                    Vendors <span className="required error-text ml-1"> *</span>
                  </label>
                  <span className="col-1 p-0">:</span>
                  <span
                    className="col-6 multiselect"
                    style={{ height: "23px" }}
                    ref={(ele) => {
                      ref.current[2] = ele;
                    }}
                  >
                    <MultiSelect
                      ArrowRenderer={ArrowRenderer}
                      id="vendors"
                      options={p1data}
                      hasSelectAll={true}
                      value={selectedp1}
                      disabled={false}
                      valueRenderer={generateDropdownLabel}
                      onChange={(e) => {
                        setSelectedp1(e);
                        let filterPractice = [];
                        e.forEach((d) => {
                          filterPractice.push(d.value);
                        });
                        setVendor1(filterPractice.toString());
                        onFilterChange({
                          id: "vendors",
                          value: filterPractice.toString(),
                        });
                      }}
                    />
                  </span>
                </div>
              </div>
            )}

            {(actionSelector === "view" || actionSelector === "wow") && (
              <div className="col-md-4 mb-2">
                {/* <div className="clearfix" style={{ height: "12px" }}></div> */}
                <div className="form-group row">
                  <label className="col-5">
                    Sales Division{" "}
                    <span className="required error-text ml-1"> *</span>
                  </label>
                  <span className="col-1 p-0">:</span>
                  <span
                    className="col-6 multiselect"
                    style={{ height: "23px" }}
                    ref={(ele) => {
                      ref.current[3] = ele;
                    }}
                  >
                    <MultiSelect
                      ArrowRenderer={ArrowRenderer}
                      valueRenderer={generateDropdownLabel}
                      options={sFOwnerDivisionsDropdown}
                      hasSelectAll={true}
                      isLoading={false}
                      shouldToggleOnHover={false}
                      disableSearch={false}
                      value={selectesFOwnerDivison}
                      disabled={false}
                      onChange={(e) => {
                        setselectesFOwnerDivison(e);
                        let filterPractice = [];
                        e.forEach((d) => {
                          filterPractice.push(d.value);
                        });
                        setDivision(filterPractice.toString());
                        onFilterChange({
                          id: "divisions",
                          value: filterPractice.toString(),
                        });
                      }}
                    />
                  </span>
                </div>
              </div>
            )}

            {(actionSelector === "view" || actionSelector === "wow") && (
              <div className="col-md-4 mb-2">
                {/* <div className="clearfix" style={{ height: "10px" }}></div> */}
                <div className="form-group row" id="week-picker-wrapper">
                  <label className="col-5">
                    From Quarter{" "}
                    <span className="required error-text ml-1"> *</span>
                  </label>
                  <span className="col-1 p-0">:</span>
                  <span
                    className="col-6 datepicker"
                    style={{ height: "23px" }}
                    ref={(ele) => {
                      ref.current[4] = ele;
                    }}
                  >
                    <DatePicker
                      selected={startDate}
                      onChange={(e) => {
                        setStartDate(e);
                        const date = new Date(e.getTime());
                        date.setFullYear(date.getFullYear() - 1);
                        date.setMonth(date.getMonth() + 3);
                        setQuarterDate(date);
                        onFilterChange({
                          id: "from",
                          value: date.toLocaleDateString("en-CA"),
                        });
                      }}
                      dateFormat="'FY' yyyy-QQQ"
                      showQuarterYearPicker
                    />
                  </span>
                </div>
              </div>
            )}
            {actionSelector === "view" && (
              <div className="col-md-4 mb-2">
                {/* <div className="clearfix" style={{ height: "12px" }}></div> */}
                <div className="form-group row">
                  <label className="col-5">Duration</label>
                  <span className="col-1 p-0">:</span>
                  <span className="col-6" style={{ height: "23px" }}>
                    <select
                      id="duration"
                      name="duration"
                      className="col-md-12 col-sm-12 col-xs-12 "
                      value={softwarePayload?.duration}
                      onChange={(e) => {
                        setDuration(e.target.value);
                        onFilterChange(e.target);
                      }}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </span>
                </div>
              </div>
            )}

            {actionSelector === "wow" && (
              <div className="col-md-4 mb-2">
                <div className="clearfix" style={{ height: "12px" }}></div>
                <div className="form-group row">
                  <label className="col-5">Show By</label>
                  <span className="col-1 p-0">:</span>
                  <span className="col-6" style={{ height: "23px" }}>
                    <select
                      id="showBy"
                      name="showBy"
                      className="col-md-12 col-sm-12 col-xs-12 "
                      value={showbyvalue}
                      onChange={(e) => {
                        setShowByValue(e.target.value);
                        onFilterChange({
                          id: "showBy",
                          value: e.target.value,
                        });
                      }}
                    >
                      <option value="week">Week</option>
                      <option value="exec">Sales Executive</option>
                    </select>
                  </span>
                </div>
              </div>
            )}

            <div className="col-md-12 no-padding section">
              {/* <div className="seFooter" style={{ borderTop: "1px solid #CCC" }}>
                {" "}
                <span className="selectedSE">
                  <b>Selected SE : </b>
                  <span className="dynText">
                    {selectedSE === "<< Select SE >>"
                      ? localSE.map((item, index) => (
                          <span key={item.id}>
                            {isIndividualChecked
                              ? item.salesPersonName
                                ? item.salesPersonName
                                : item.text
                              : item.salesPersonName
                              ? item.salesPersonName
                              : item.text + ` & Team`}
                            {index === localSE.length - 1 ? "" : ", "}
                          </span>
                        ))
                      : selectedSE}
                  </span>
                </span>
                <div className="clearfix " style={{ height: "5px" }}></div>
              </div> */}
            </div>

            {actionSelector == "target" ? (
              <div className="col-md-12 col-sm-12 col-xs-12 my-2 search btn-container center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    getData1();
                    setTargetOpen(false);
                    setWowDisplay(false);
                    setShowDetails(false);
                  }}
                >
                  <FaSearch /> Search{" "}
                </button>
                {editDefaultName && selectedFilter !== "<< New >>" ? (
                  <div className="col-4 pl-0 d-flex thirdchild">
                    <div className=" col-md-12">
                      <div className="form-group row">
                        <label className="col-4">
                          Enter Search Name
                          <span className="error-text">*</span>
                        </label>
                        <span className="col-1 p-0">:</span>
                        <div className="col-7">
                          <div
                            className="textfield col-12 d-flex align-item-center MRF-ESN-drop-down-input"
                            ref={(ele) => {
                              ref.current[0] = ele;
                            }}
                          >
                            <input
                              type="text"
                              name="search_name"
                              id="search_name"
                              value={editDefaultNameChange}
                              onChange={handleInputChange}
                            />
                            {selectedFilter == "<< New >>" ||
                            editDefaultName ? (
                              <div className="form-group row">
                                <div className="col-12">
                                  <div
                                    ref={(ele) => {
                                      ref.current[0] = ele;
                                    }}
                                  >
                                    <select
                                      value={dropdownValue}
                                      onChange={(e) => {
                                        setDropdownValue(e.target.value);
                                      }}
                                    >
                                      <option value="0">Populate</option>
                                      <option value="1">Start Up</option>
                                      {/* <option value="2">Populate</option> */}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}

                            {editDefaultName &&
                            selectedFilter !== "<< New >>" ? (
                              <div className="col-md-1 MRF-drop-down-save">
                                {" "}
                                <FaSave
                                  title="Save"
                                  size="1.3em"
                                  color="#15A7ea"
                                  onClick={handleCombinedClick}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <SavedSearchGlobalNew
                  setEditAddmsg={setEditAddmsg}
                  pageurl={pageurl}
                  listItem={listItem}
                  setDropdownValue={setDropdownValue}
                  page_Name={page_Name}
                  editDefaultName={editDefaultName}
                  setEditDefaultName={setEditDefaultName}
                  selectedFilter={selectedFilter}
                  payload={softwarePayload}
                  getDefaultFiltersData={getDefaultFiltersData}
                  dropdownValue={dropdownValue}
                  setNewSavedSearchValid={setNewSavedSearchValid}
                  setValidMessageSavedSearch={setValidMessageSavedSearch}
                />
              </div>
            ) : (
              <div className="col-md-12 col-sm-12 col-xs-12 my-2 search btn-container center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    softwareSearchValidator();
                    setWowDisplay(false);
                    setTargetOpen(false);
                    setViewDisplay(false);
                  }}
                >
                  <FaSearch /> Search{" "}
                </button>
                {editDefaultName && selectedFilter !== "<< New >>" ? (
                  <div className="col-4 pl-0 d-flex thirdchild">
                    <div className=" col-md-12">
                      <div className="form-group row">
                        <label className="col-4">
                          Enter Search Name
                          <span className="error-text">*</span>
                        </label>
                        <span className="col-1 p-0">:</span>
                        <div className="col-7">
                          <div
                            className="textfield col-12 d-flex align-item-center MRF-ESN-drop-down-input"
                            ref={(ele) => {
                              ref.current[0] = ele;
                            }}
                          >
                            <input
                              type="text"
                              name="search_name"
                              id="search_name"
                              value={editDefaultNameChange}
                              onChange={handleInputChange}
                            />
                            {selectedFilter == "<< New >>" ||
                            editDefaultName ? (
                              <div className="form-group row">
                                <div className="col-12">
                                  <div
                                    ref={(ele) => {
                                      ref.current[0] = ele;
                                    }}
                                  >
                                    <select
                                      value={dropdownValue}
                                      onChange={(e) => {
                                        setDropdownValue(e.target.value);
                                      }}
                                    >
                                      <option value="0">Populate</option>
                                      <option value="1">Start Up</option>
                                      {/* <option value="2">Populate</option> */}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}

                            {editDefaultName &&
                            selectedFilter !== "<< New >>" ? (
                              <div className="col-md-1 MRF-drop-down-save">
                                {" "}
                                <FaSave
                                  title="Save"
                                  size="1.3em"
                                  color="#15A7ea"
                                  onClick={handleCombinedClick}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <SavedSearchGlobalNew
                  setEditAddmsg={setEditAddmsg}
                  pageurl={pageurl}
                  listItem={listItem}
                  setDropdownValue={setDropdownValue}
                  page_Name={page_Name}
                  editDefaultName={editDefaultName}
                  setEditDefaultName={setEditDefaultName}
                  selectedFilter={selectedFilter}
                  payload={softwarePayload}
                  getDefaultFiltersData={getDefaultFiltersData}
                  dropdownValue={dropdownValue}
                  setNewSavedSearchValid={setNewSavedSearchValid}
                  setValidMessageSavedSearch={setValidMessageSavedSearch}
                />
              </div>
            )}
            <SelectSEDialogBox
              visible={visible}
              setVisible={setVisible}
              setGrpId={setGrpId}
              salesfullAccess={salesfullAccess}
              accessData={accessData}
              setSelectedExe={setSelectedExe}
              setSelectedObject={setSelectedObject}
            />
          </div>
        </CCollapse>

        {targetOpen && (
          <>
            <TargetTable
              data={data}
              setData={setData}
              tableData={tableData}
              buttonAction={buttonAction}
              reportId={reportId}
              setTableData={setTableData}
              headerData={headerData}
              loader={loader}
              setHeaderData={setHeaderData}
              setErrorMessage={setErrorMessage}
              getData1={getData1}
              accessData={accessData}
            />
          </>
        )}
      </div>
    </div>
  );
}
