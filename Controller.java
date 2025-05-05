package com.prolifics.DashboardMS.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Objects;
import com.prolifics.DashboardMS.VO.ChecklistVO;
import com.prolifics.DashboardMS.VO.EmpChekinsVO;
import com.prolifics.DashboardMS.VO.Pep369ChekinsVO;
import com.prolifics.DashboardMS.VO.Pep369ExportVO;
import com.prolifics.DashboardMS.VO.ResponseVO;
import com.prolifics.DashboardMS.domain.PepPPlan369Checkins;
import com.prolifics.DashboardMS.domain.PepPPlan369EmployeeGoals;
import com.prolifics.DashboardMS.domain.PepPPlan369EmployeeNineBoxRatings;
import com.prolifics.DashboardMS.domain.PepPPlan369EmployeeObjectiveWiseRating;
import com.prolifics.DashboardMS.domain.PepPPlan369EmployeeSectionData;
import com.prolifics.DashboardMS.domain.PepPPlan369ProjectManagerFeedback;
import com.prolifics.DashboardMS.domain.PepPPlan369Section;
import com.prolifics.DashboardMS.domain.PepPPlan369SubmitQuestionaire;
import com.prolifics.DashboardMS.dto.EmployeesListDTO;
import com.prolifics.DashboardMS.dto.FunctionalReportiesDTO;
import com.prolifics.DashboardMS.dto.PEP369ReporteesDTO;
import com.prolifics.DashboardMS.dto.Pep369EmployeeGoalsDTO;
import com.prolifics.DashboardMS.dto.Pep369EmployeeSectionsDTO;
import com.prolifics.DashboardMS.dto.Pep369boxGridDTO;
import com.prolifics.DashboardMS.dto.PepPPlan369EmployeeObjectiveWiseRatingDTO;
import com.prolifics.DashboardMS.dto.ReporteesDepartmentInfoDTO;
import com.prolifics.DashboardMS.repository.EmployeeLeavesRepository;
import com.prolifics.DashboardMS.service.PEP369EmployeeSectionDataService;
import com.prolifics.DashboardMS.service.PEP369GoalsService;
import com.prolifics.DashboardMS.service.PEP369Service;
import com.prolifics.DashboardMS.service.PepPPlan369EmployeeObjectiveWiseRatingService;
import com.prolifics.DashboardMS.service.PepPPlan369SectionService;
import com.prolifics.DashboardMS.service.PepPPlan369SubmitQuestionaireService;


@RestController
@RequestMapping("/PEP369")
public class PEP369Controller {
	
	private static final Logger logger = LoggerFactory.getLogger(PEP369Controller.class);
	private static PEP369Service pep369Service;
	private PEP369EmployeeSectionDataService pep369EmployeeSectionDataService;
	private PEP369GoalsService pep369GoalsService;
	private PepPPlan369SubmitQuestionaireService pepPPlan369SubmitQuestionaireService;
	private PepPPlan369EmployeeObjectiveWiseRatingService pepPPlan369EmployeeObjectiveWiseRatingService;
	private PepPPlan369SectionService pepPPlan369SectionService;
	@Autowired
	private EmployeeLeavesRepository employeeLeavesRepository;
	
	@Autowired
	public PEP369Controller(PEP369Service PEP369ServiceObj, PEP369EmployeeSectionDataService pep369EmployeeSectionDataServiceObj, PEP369GoalsService pep369GoalsServiceObj, PepPPlan369SubmitQuestionaireService pepPPlan369SubmitQuestionaireServiceObj, PepPPlan369EmployeeObjectiveWiseRatingService pepPPlan369EmployeeObjectiveWiseRatingServiceObj, PepPPlan369SectionService pepPPlan369SectionServiceObj) {
		pep369Service = PEP369ServiceObj;
		pep369EmployeeSectionDataService = pep369EmployeeSectionDataServiceObj;
		pep369GoalsService = pep369GoalsServiceObj;
		pepPPlan369SubmitQuestionaireService = pepPPlan369SubmitQuestionaireServiceObj;
		pepPPlan369EmployeeObjectiveWiseRatingService =pepPPlan369EmployeeObjectiveWiseRatingServiceObj;
		pepPPlan369SectionService = pepPPlan369SectionServiceObj;
		
	}
	
	private static final String SECRET_KEY = "1234567890123456"; // 16-char key for AES

    public static String encrypt(String data) throws Exception {
        SecretKeySpec key = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding"); 
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] encrypted = cipher.doFinal(data.getBytes());
        return Base64.getEncoder().encodeToString(encrypted);
    }
	
	
	@CrossOrigin
	@GetMapping("/getEmployeeSections")
	public List<Pep369EmployeeSectionsDTO> getEmpSections(@RequestParam Integer employeeId, @RequestParam Integer financialYearId, @RequestParam Integer quarterId) throws Exception
	{
		logger.info("In PEP369Controller :: getEmpSections ", employeeId, financialYearId, quarterId);
		
		return pep369Service.getPEP369EmployeeSections(employeeId, financialYearId, quarterId);
	}

	@CrossOrigin
	@GetMapping("/getEmployeeGoals")
	public List<Pep369EmployeeGoalsDTO> getEmployeeGoals(@RequestParam Integer employeeId, @RequestParam Integer quarterId) throws Exception
	{
		logger.info("In PEP369Controller :: getEmployeeGoals ", employeeId, quarterId);
		
		return pep369Service.getPEP369EmployeeGoals(employeeId, quarterId);
	}
	
	@CrossOrigin
	@GetMapping("/getEmployeeCheckins")
	public List<PepPPlan369Checkins> getEmployeeCheckins(@RequestParam Integer objectiveId) throws Exception
	{
		logger.info("In PEP369Controller :: getEmployeeCheckins ", objectiveId);
		
		return pep369Service.getPEP369EmployeeCheckins(objectiveId);
	}
	
	@CrossOrigin
	@GetMapping("/getEmployeeList")
	public List<EmployeesListDTO> getEmployeeList() throws Exception
	{
		logger.info("In PEP369Controller :: getEmployeeList");
		
		return pep369Service.getEmployeeList();
	}
	
	@CrossOrigin
	@GetMapping("/getPepPPlan369EmployeeObjectiveWiseRating")
	public List<PepPPlan369EmployeeObjectiveWiseRatingDTO> getPepPPlan369EmployeeObjectiveWiseRating(@RequestParam Integer employeeId, @RequestParam Integer quarterId) throws Exception
	{
		logger.info("In PEP369Controller :: getPepPPlan369EmployeeObjectiveWiseRating ", employeeId, quarterId);
		
		return pep369Service.getPepPPlan369EmployeeObjectiveWiseRating(employeeId, quarterId);
	}
	
	@CrossOrigin
	@GetMapping("/getQuarterId")
	public Integer getQuarterId(@RequestParam Integer financialYearId, @RequestParam Integer quarterId) throws Exception
	{
		logger.info("In PEP369Controller :: getQuarterId",  financialYearId, quarterId);
		
		return pep369Service.getQuarterId(financialYearId, quarterId);
	}
	
	@CrossOrigin
	@GetMapping("/getPep369Reportees")
	public List<PEP369ReporteesDTO> getPep369Reportees(@RequestParam String type, @RequestParam Integer employeeId, @RequestParam Integer financialYearId, @RequestParam Integer quarterId, @RequestParam Integer departmentId,@RequestParam Integer loggedUserId,@RequestParam Integer location) throws Exception
	{
		logger.info("In PEP369Controller :: getPep369Reportees ", type, employeeId, financialYearId, quarterId, departmentId,loggedUserId);
		
		return pep369Service.getPep369Reportees(type, employeeId, financialYearId, quarterId, departmentId, loggedUserId,location);
	}
	
	@CrossOrigin
	@GetMapping("/getReporteesDepartmentInfos")
	public List<ReporteesDepartmentInfoDTO> getReporteesDepartmentInfos(@RequestParam Integer employeeId) throws Exception
	{
		logger.info("In PEP369Controller :: getReporteesDepartmentInfos ", employeeId);
		
		return pep369Service.getReporteesDepartmentInfos( employeeId);
	}
	
	@CrossOrigin
	@PostMapping(path="/savePepPPlan369Checkins")
	public ResponseEntity<List<PepPPlan369Checkins>> savePepPPlan369Checkins(@RequestBody List<PepPPlan369Checkins> pepPPlan369Checkins)
	{
		logger.info("In PEP369Controller :: savePepPPlan369Checkins ", pepPPlan369Checkins);
		
		return ResponseEntity.ok(pep369Service.savePepPPlan369Checkins(pepPPlan369Checkins));
	}
	
	@CrossOrigin
	@PutMapping(path="/updatePepPPlan369Checkins")
	public ResponseEntity<List<PepPPlan369Checkins>> updatePepPPlan369Checkins(@RequestBody List<PepPPlan369Checkins> pepPPlan369Checkins)
	{
		logger.info("In PEP369Controller :: updatePepPPlan369Checkins ", pepPPlan369Checkins);
		
		return ResponseEntity.ok(pep369Service.updatePepPPlan369Checkins(pepPPlan369Checkins));
	}
	
	@CrossOrigin
	@GetMapping("/getPEP369EmployeeSectionDataByEmployeeIdAndPepPPlan369QuarterId")
	public List<PepPPlan369EmployeeSectionData> getPEP369EmployeeSectionDataByEmployeeIdAndPepPPlan369QuarterId(@RequestParam Integer employeeId, @RequestParam Integer quarterId) throws Exception
	{
		logger.info("In PEP369Controller :: getPEP369EmployeeSectionDataByEmployeeIdAndPepPPlan369QuarterId {}, {}", employeeId, quarterId);
		
		return pep369EmployeeSectionDataService.getPEP369EmployeeSectionDataByEmployeeIdAndPepPPlan369QuarterId( employeeId, quarterId);
	}
	
	@CrossOrigin
	@GetMapping("/getPepPPlan369EmployeeGoalsByEmployeeIdAndPepPPlan369QuarterId")
	public List<PepPPlan369EmployeeGoals> getPepPPlan369EmployeeGoalsByEmployeeIdAndPepPPlan369QuarterId(@RequestParam Integer employeeId, @RequestParam Integer quarterId) throws Exception
	{
		logger.info("In PEP369Controller :: getPepPPlan369EmployeeGoalsByEmployeeIdAndPepPPlan369QuarterId {}, {}", employeeId, quarterId);
		
		return pep369GoalsService.getPepPPlan369EmployeeGoalsByEmployeeIdAndPepPPlan369QuarterId( employeeId, quarterId);
	}
	
	@CrossOrigin
	@RequestMapping("/deletePEP369EmployeegoalsById")
	public Integer deletePEP369EmployeeGoalsById(@RequestParam Integer id) throws Exception
	{
		logger.info("In PEP369Controller :: deletePEP369EmployeeGoalsById {}", id);
		
		return pep369GoalsService.deletePepPPlan369EmployeeGoalsById(id);
	}
	
	@CrossOrigin
	@RequestMapping("/deletePepPPlan369Checkins")
	public Boolean deletePepPPlan369Checkins(@RequestParam List<Integer> ids) throws Exception
	{
		logger.info("In PEP369Controller :: deletePepPPlan369Checkins {}", ids);
		
		pep369Service.deleteAllById(ids);
		
		return true;
	}
	
	@CrossOrigin
	@RequestMapping("/deletePepPPlan369CheckinsByPplanEmployeeObjectiveId")
	public Integer deletePepPPlan369CheckinsByPplanEmployeeObjectiveId(@RequestParam Integer goalId) throws Exception
	{
		logger.info("In PEP369Controller :: deletePepPPlan369CheckinsByPplanEmployeeObjectiveId ", goalId);
		
		return pep369Service.deleteByPplanEmployeeObjectiveId(goalId);
	}
	
	@CrossOrigin
	@PostMapping(path="/savePepPPlan369SubmitQuestionaire")
	public ResponseEntity<PepPPlan369SubmitQuestionaire> savePepPPlan369SubmitQuestionaire(@RequestBody PepPPlan369SubmitQuestionaire pepPPlan369SubmitQuestionaire)
	{
		logger.info("In PEP369Controller :: savePepPPlan369SubmitQuestionaire {} ", pepPPlan369SubmitQuestionaire);
		
		return ResponseEntity.ok(pepPPlan369SubmitQuestionaireService.savePepPPlan369SubmitQuestionaire(pepPPlan369SubmitQuestionaire));
	}
	
	@CrossOrigin
	@GetMapping("/getPepPPlan369SubmitQuestionaireByEmployeeIdAndQuarterId")
	public List<PepPPlan369SubmitQuestionaire> getPepPPlan369SubmitQuestionaireByEmployeeIdAndQuarterId(@RequestParam String employeeId, @RequestParam Integer quarterId) throws Exception
	{
		logger.info("In PEP369Controller :: getPepPPlan369SubmitQuestionaireByEmployeeIdAndQuarterId {}, {}", employeeId, quarterId);
		
		return pepPPlan369SubmitQuestionaireService.getPepPPlan369SubmitQuestionaireByEmployeeIdAndQuarterId( employeeId, quarterId);
	}
	
	@CrossOrigin
	@GetMapping("/getPepPPlan369EmployeeObjectiveWiseRatingByEmployeeIdAndPepPPlan369QuarterId")
	public ResponseEntity<List<PepPPlan369EmployeeObjectiveWiseRating>> getPepPPlan369EmployeeObjectiveWiseRatingByEmployeeIdAndPepPPlan369QuarterId(@RequestParam Integer employeeId, @RequestParam Integer quarterId) throws Exception
	{
		logger.info("In PEP369Controller :: getPepPPlan369EmployeeObjectiveWiseRatingByEmployeeIdAndPepPPlan369QuarterId {}, {}", employeeId, quarterId);
		
		return ResponseEntity.ok(pepPPlan369EmployeeObjectiveWiseRatingService.getPepPPlan369EmployeeObjectiveWiseRatingByEmployeeIdAndPepPPlan369QuarterId( employeeId, quarterId));
	}
	
	@CrossOrigin
	@GetMapping("/getPepPPlan369Sections")
	public ResponseEntity<List<PepPPlan369Section>> getPepPPlan369Sections() throws Exception
	{
		logger.info("In PEP369Controller :: getPepPPlan369Sections " );
		
		return ResponseEntity.ok(pepPPlan369SectionService.getPepPPlan369Sections());
	}
	
	@CrossOrigin
	@PutMapping(path="/updatePEP369EmployeeSectionData")
	public ResponseEntity<PepPPlan369EmployeeSectionData> updatePEP369EmployeeSectionData(@RequestBody PepPPlan369EmployeeSectionData pepPPlan369EmployeeSectionData)
	{
		logger.info("In PEP369Controller :: updatePEP369EmployeeSectionData ", pepPPlan369EmployeeSectionData);
		
		return ResponseEntity.ok(pep369EmployeeSectionDataService.updatePEP369EmployeeSectionData(pepPPlan369EmployeeSectionData));
	}	
	
	@CrossOrigin
	@PostMapping(path="/savePepPPlan369EmployeeGoal")
	public ResponseEntity<PepPPlan369EmployeeGoals> savePepPPlan369EmployeeGoal(@RequestBody PepPPlan369EmployeeGoals pepPPlan369EmployeeGoal)
	{
		logger.info("In PEP369Controller :: savePepPPlan369EmployeeGoal ", pepPPlan369EmployeeGoal);
		
		return ResponseEntity.ok(pep369GoalsService.savePepPPlan369EmployeeGoal(pepPPlan369EmployeeGoal));
	}
	
	@CrossOrigin
	@PutMapping(path="/updatePepPPlan369EmployeeGoal")
	public ResponseEntity<PepPPlan369EmployeeGoals> updatePepPPlan369EmployeeGoal(@RequestBody PepPPlan369EmployeeGoals pepPPlan369EmployeeGoal)
	{
		logger.info("In PEP369Controller :: updatePepPPlan369EmployeeGoal ", pepPPlan369EmployeeGoal);
		
		return ResponseEntity.ok(pep369GoalsService.updatePepPPlan369EmployeeGoal(pepPPlan369EmployeeGoal));
	}
	
	@CrossOrigin
	@PutMapping(path="/updatePepPPlan369EmployeeGoalPer")
	public PepPPlan369EmployeeGoals updatePepPPlan369EmployeeGoalPer(@RequestParam(name="objId") Integer objId,@RequestParam(name="objectivePer") Float objectivePer)
	{
		logger.info("In PEP369Controller :: updatePepPPlan369EmployeeGoal ");
		
		return pep369GoalsService.updatePepPPlan369EmployeeGoalPer(objId,objectivePer);
	}
	 @CrossOrigin
	 @GetMapping(value="/getpromotion")
	 public List<Map<String, Object>> getPromotionData(@RequestParam(name="empId") String empId) throws Exception {
	       logger.info(" In PEP369Controller :: getPromotionData ");
		   return pep369Service.getPromotionData(empId);   
	    }
	 
	 @CrossOrigin
	 @GetMapping(value="/getcheckList")
	 public  Map<String,String> getcheckList(@RequestParam(name="empId") String empId) throws Exception {
	       logger.info(" In PEP369Controller :: getcheckList ");
		   return pep369GoalsService.getcheckList(empId);   
	    }
	 @CrossOrigin
	 @GetMapping(value="/getAcheivableHours")
	 public  List<ChecklistVO> getAcheivableHours() throws Exception {
	       logger.info(" In PEP369Controller :: getAcheivableHours ");
		   return pep369GoalsService.getAcheivableHours();   
	    }
	 
	 @CrossOrigin
	 @GetMapping(value="/getSkillCount")
	 public  Map<String,Integer> getSkillCount(@RequestParam(name="empId") String empId) throws Exception {
	       logger.info(" In PEP369Controller :: getSkillCount ");
		   return pep369GoalsService.getSkillCount(empId);   
	    }
	 @CrossOrigin
	 @GetMapping(value="/getFunctionalReporties")
	 public  List<FunctionalReportiesDTO> getFunctionalReporties(@RequestParam(name="supId") Integer supId,@RequestParam(name="quarter_id") Integer quarter_id,@RequestParam(name="allRep") Integer allRep,@RequestParam(name="loc") String loc) throws Exception {
	       logger.info(" In PEP369Controller :: getFunctionalReporties ");
		   return pep369Service.getFunctionalReporties(supId,quarter_id,allRep,loc);   
	    }
	 
	 @CrossOrigin
	 @PostMapping("PepPlan369ProjMangerFeedback")
	 public ResponseVO PepPlan369ProjMangerFeedback(@RequestBody PepPPlan369ProjectManagerFeedback pepPPlan369ProjectManagerFeedback) {
		 logger.info("in PEP369Controller || in PepPlan369ProjMangerFeedback()");
		 return pep369Service.PepPlan369ProjMangerFeedback(pepPPlan369ProjectManagerFeedback);
		 }
	 
	 
	 @CrossOrigin
	 @GetMapping(value="/getPep369Checkins")
	 public List<Pep369ChekinsVO>  getPep369Checkins(@RequestParam(name="empId") String empId,@RequestParam(name="quarter_id") Integer quarter_id) {
		 logger.info("in PEP369Controller || in getPep369Checkins()");
		 return pep369GoalsService.getPep369Checkins(empId,quarter_id);
		 }
	 @CrossOrigin
	 @GetMapping(value="/getPep369Feedback")
	 public  Map<String,String> getPep369Feedback(@RequestParam(name="empId") String empId,@RequestParam(name="quarter_id") Integer quarter_id) throws Exception {
	       logger.info(" In PEP369Controller :: getPep369Feedback ");
		   return pep369GoalsService.getPep369Feedback(empId,quarter_id);   
	    }
	 
	 @CrossOrigin
	 @GetMapping("/getpep369boxGrid")
	 public List<Pep369boxGridDTO> getpep369boxGrid(@RequestParam String type, @RequestParam Integer employeeId,@RequestParam Integer financialYearId, @RequestParam Integer quarterId, @RequestParam Integer departmentId) throws Exception
		{
		logger.info("In PEP369Controller :: getpep369boxGrid ", type, employeeId, quarterId, departmentId);
			
		return pep369Service.getpep369boxGrid(type, employeeId,  financialYearId,quarterId, departmentId);
		}
		
	 
	 @CrossOrigin
	 @GetMapping(value="/copyFromPreQuarter")
	 public  Integer copyFromPreQuarter(@RequestParam(name="empId") String empId,@RequestParam(name="quarterId") Integer quarterId) throws Exception {
	       logger.info(" In PEP369Controller :: copyFromPreQuarter ");
		   return pep369GoalsService.copyFromPreQuarter(empId,quarterId);   
	    }
	 
	 @CrossOrigin
	 @GetMapping(value="/getPep369GridCountData")
	 public  Map<String,Integer> getPep369GridCountData(@RequestParam(name="type") String type,@RequestParam(name="employeeId") Integer employeeId,@RequestParam(name="departmentId") Integer departmentId) throws Exception {
	       logger.info(" In PEP369Controller :: getPep369GridCountData ");
		   return pep369GoalsService.getPep369GridCountData(type,employeeId,departmentId);   
	    }
	 @CrossOrigin
	 @GetMapping(value = "/getRatingCount")
	 public String getRatingCount(@RequestParam(name = "empId") String empId,
	                              @RequestParam(name = "quarterId") Integer quarterId) throws Exception {
	     logger.info("In PEP369Controller :: getRatingCount");

	     Map<String, String> ratingData = pep369GoalsService.getRatingCount(empId, quarterId);

	     // Convert Map to JSON string
	     ObjectMapper objectMapper = new ObjectMapper();
	     String json = objectMapper.writeValueAsString(ratingData);

	     // Encrypt and return
	     return encrypt(json);
	 }
	 @CrossOrigin
	 @GetMapping("/getPep369Grid")
	 public String getPep369Grid(@RequestParam String empId, @RequestParam Integer quarterId) throws Exception {
	     Map<String, Integer> result = pep369GoalsService.getPep369Grid(empId, quarterId);

	     ObjectMapper objectMapper = new ObjectMapper();
	     String json = objectMapper.writeValueAsString(result);

	     return encrypt(json);
	 }


	 @CrossOrigin
		@PutMapping(path="/updatePepPPlan369EmployeeSectionPer")
		public PepPPlan369EmployeeSectionData updatePepPPlan369EmployeeSectionPer(@RequestParam(name="secId") Integer secId,@RequestParam(name="sectionPer") Float sectionPer)
		{
			logger.info("In PEP369Controller :: updatePepPPlan369EmployeeSectionPer ");
			
			return pep369GoalsService.updatePepPPlan369EmployeeSectionPer(secId,sectionPer);
		}

	 
	 @CrossOrigin
		@GetMapping(path="/getsectionIdByObj")
		public String getsectionIdByObj(@RequestParam(name="objId") Integer objId)
		{
			logger.info("In PEP369Controller :: getsectionIdByObj ");
			
			return pep369GoalsService.getsectionIdByObj(objId);
		}
	 @CrossOrigin
	 @GetMapping(value="/updateObjWiseRating")
	 public  PepPPlan369EmployeeObjectiveWiseRating updateObjWiseRating
	 (@RequestParam(name="empId") Integer empId,@RequestParam(name="quarterId") Integer quarterId,@RequestParam(name="objTypeId") Integer objTypeId,@RequestParam(name="sectionGoalPer") Float sectionGoalPer)
		throws Exception {
	       logger.info(" In PEP369Controller :: updateObjWiseRating ");
		   return pep369GoalsService.updateObjWiseRating(empId,quarterId,objTypeId,sectionGoalPer);   
	    }
	 
	 @CrossOrigin
	 @GetMapping(value="/getpep369EmpChekins")
	 public List<EmpChekinsVO>  getpep369EmpChekins(@RequestParam(name="type") String type,@RequestParam(name="empId") Integer empId,@RequestParam(name="quarterId") Integer quarterId,@RequestParam(name="departmentId") Integer departmentId) {
		 logger.info("in PEP369Controller || in getpep369EmpChekins()");
		 return pep369GoalsService.getpep369EmpChekins(type, empId,quarterId,departmentId);
		 }
	 
	 @CrossOrigin
	 @GetMapping(value="/updateEmpRating")
	 public  PepPPlan369EmployeeNineBoxRatings updateEmpRating
	 (@RequestParam(name="empId") Integer empId,@RequestParam(name="quarterId") Integer quarterId,@RequestParam(name="empPer") Float empPer)
		throws Exception {
	       logger.info(" In PEP369Controller :: updateEmpRating ");
		   return pep369GoalsService.updateEmpRating(empId,quarterId,empPer);   
	    }
	 
		@CrossOrigin
		@GetMapping("/getPep369Export")
		public List<Pep369ExportVO> getPep369SectionExport(@RequestParam Integer employeeId, @RequestParam Integer financialYearId, @RequestParam Integer quarterId) throws Exception
		{
			logger.info("In PEP369Controller :: getPep369SectionExport ", employeeId, financialYearId, quarterId);
			
			return pep369Service.getPep369SectionExport(employeeId, financialYearId, quarterId);
		}
		
		 @CrossOrigin
		 @GetMapping(value="/getPep369Checkins1")
		 public List<Pep369ChekinsVO>  getPep369Checkins1(@RequestParam(name="empId") String empId,@RequestParam(name="quarter_id") Integer quarter_id) {
			 logger.info("in PEP369Controller || in getPep369Checkins1()");
			 return pep369GoalsService.getPep369Checkins1(empId,quarter_id);
			 }
		 

		 @CrossOrigin
				 @GetMapping(value="/getPep369Checkinsper")
				 public Boolean  getPep369Checkinsper(@RequestParam(name="empId") Integer empId,@RequestParam(name="quarter_id") Integer quarter_id) {
					 logger.info("in PEP369Controller || in getPep369Checkinsper()");
					 return pep369GoalsService.getPep369Checkinsper(empId,quarter_id);
					 }
				
	
		 @SuppressWarnings("rawtypes")
		 @CrossOrigin
		 @PostMapping(value="/importGoalsJson")
		 public String  importPEPGoals(@RequestParam(name="file") MultipartFile file,@RequestParam(name="employeeId") Integer employeeId,@RequestParam(name="quarter") Integer quarter )throws IOException {
			 logger.info(" PEP369Controller :: importPEPGoals: ");
			 
			 

//	          pep369Service.updateGoals(importGoalsList);
	         
	            
	            return  pep369Service.updateGoals(file,employeeId,quarter);
	        }
		 
		 
		 @CrossOrigin
		 @GetMapping(value="/getcheking")
		 public   List<Map<String,Object>>  getcheking(@RequestParam(name="locIds") String locIds,@RequestParam(name="deptIds") String deptIds) throws Exception {
		       logger.info(" In PEP369Controller :: getcheking ");
			   return pep369GoalsService.getcheking(locIds,deptIds);   
		    }
		 
		 
		 @CrossOrigin
		 @GetMapping(value="/getStartEndDateByQuar")
		 public   List<Map<String,Object>>  getStartEndDateByQuar(@RequestParam(name="quarId") Integer quarId) throws Exception {
		       logger.info(" In PEP369Controller :: getStartEndDateByQuar ");
			   return pep369GoalsService.getStartEndDateByQuar(quarId);   
		    }
		 
		 @CrossOrigin
		 @GetMapping(value="/getcompetencyLead")
		 public   List<Map<String,Object>>  getAllReposties(@RequestParam(name="empid") String empid) {
		       logger.info(" In PEP369Controller :: getcheckList ");
			   return pep369GoalsService.getcompetencyLead(empid);   
		    }
		
		 @CrossOrigin
		 @GetMapping(value="/getcompetencyLeadAccess")
		 public   List<Map<String,Object>>  getcompetencyLeadAccess() throws Exception {
		       logger.info(" In PEP369Controller :: getcheckList ");
			   return pep369GoalsService.getcompetencyLeadAccess();   
		    }
		 
		 @CrossOrigin
         @GetMapping(value="/getCountOfEmployeeForDepartmntHead")
         public   int  getCountOfEmployeeForDepartmntHead(@RequestParam(name="id") int id) throws Exception {
               logger.info(" In PEP369Controller :: getcheckList ");
               return pep369GoalsService.getCountOfEmployeeForDepartmntHead(id);   
            }
		 @CrossOrigin
         @PutMapping(value="/updateClReveiw")
         public List<Map<String,Object>> updateClReveiw(@RequestBody List<Map<String,Object>> empValue)
         {
             logger.info("In TrainingRequestController :: updatePepPPlan369EmployeeGoal "+empValue);

             return pep369GoalsService.updateClReveiw(empValue);
         }
		 
		 @CrossOrigin
		 @GetMapping(value="/getDepartment")
		 public   List<Map<String,Object>>  getDepartment(@RequestParam(name="id") int id) throws Exception {
		  logger.info(" In PEP369Controller :: getcheckList ");
		             return pep369GoalsService.getDepartment(id);   
		 }
		 @CrossOrigin
		 @GetMapping(value="/getPromotionAppraisal")
		 public List<Map<String, Object>> getPromotionAppraisal(
		@RequestParam(name = "fromDate") String fromDate,
	    @RequestParam(name = "toDate") String  toDate,
	    @RequestParam(name = "ParentId") String ParentId,
		@RequestParam(name = "courses") String courses,
	    @RequestParam(name = "comp_status") String comp_status,
	    @RequestParam(name = "is_bulk") Integer is_bulk) {
 
			    return pep369GoalsService.getPromotionAppraisal(fromDate, toDate, ParentId, courses, comp_status, is_bulk);
			}
		 @CrossOrigin
			@PostMapping(path="/saveNineBoxRating")
			public Map<String,Object> saveNineBoxRating(@RequestBody Map<String,Object> request)
			{
				logger.info("In PEP369Controller :: saveNineBoxRating ", request);
				System.out.println("99999999999999999999");
				
			return pep369GoalsService.saveNineBoxRating(request);
			}
		 @CrossOrigin
		 @GetMapping(value="/getCompetencyLevel")
		 public   List<Map<String,Object>>  getCompetencyLevel(@RequestParam(name="empid") String empid) {
		       logger.info(" In PEP369Controller :: getCompetencyLevel ");
			   return pep369GoalsService.getCompetencyLevel(empid);   
		    }
		 
		 @CrossOrigin
		 @GetMapping(value="/getSupervisorRatingData")
		 public   List<Map<String,Object>>  getSupervisorRatingData(@RequestParam(name="empid") Integer empid ,@RequestParam(name="quarter") String quarter) {
		       logger.info(" In PEP369Controller :: getSupervisorRatingData ");
			   return pep369GoalsService.getSupervisorRatingData(empid,quarter);   
		    }
		 
		 @CrossOrigin
		 @GetMapping(value="/getSupervisorLevel")
		 public   List<Map<String,Object>>  getSupervisorLevel(@RequestParam(name="empid") String empid) {
		       logger.info(" In PEP369Controller :: getSupervisorLevel ");
			   return pep369GoalsService.getSupervisorLevel(empid);   
		    }
		 @CrossOrigin
		 @GetMapping(value="/getsupervisorLevelData")
		 public   List<Map<String,Object>>  getsupervisorLevelData(@RequestParam(name="empid") Integer empid,@RequestParam(name="quarter") Integer quarter) {
		       logger.info(" In PEP369Controller :: getsupervisorLevelData ");
			   return pep369GoalsService.getsupervisorLevelData(empid,quarter);   
		    }
		 @CrossOrigin
		 @GetMapping(value="/getApproveRejectlevels")
		 public   List<Map<String,Object>>  getApproveRejectlevels(@RequestParam(name="empid") String empid) {
		       logger.info(" In PEP369Controller :: getApproveRejectlevels ");
			   return pep369GoalsService.getApproveRejectlevels(empid);   
		    }
		 @CrossOrigin
			@PostMapping(path="/saveApprovalUpdate")
			public Map<String,Object> saveApprovalUpdate(@RequestBody Map<String,Object> request)
			{
				logger.info("In PEP369Controller :: saveNineBoxRating ", request);
				
			return pep369GoalsService.saveApprovalUpdate(request);
			}
		 @CrossOrigin
			@PostMapping(path="/saveRejectUpdate")
			public Map<String,Object> saveRejectUpdate(@RequestBody Map<String,Object> request)
			{
				logger.info("In PEP369Controller :: saveNineBoxRating ", request);
				
			return pep369GoalsService.saveRejectUpdate(request);
			}
		 
		 @CrossOrigin
			@PostMapping(path="/saveNineBoxRatingSupervisorAndCompetency")
			public Map<String,Object> saveNineBoxRatingSupervisorAndCompetency(@RequestBody Map<String,Object> request)
			{
				logger.info("In PEP369Controller :: saveNineBoxRatingSupervisorAndCompetency ", request);
		
				
			return pep369GoalsService.saveNineBoxRatingSupervisorAndCompetency(request);
			}
		
		 @CrossOrigin
		 @GetMapping(value="/getQuestionaries")
		 public   List<Map<String,Object>>  getQuestionaries(@RequestParam(name="empid") String empid,@RequestParam(name="quarter") String quarter) {
		       logger.info(" In PEP369Controller :: getApproveRejectlevels ");
			   return pep369GoalsService.getQuestionaries(empid,quarter);   
		    }
		 @CrossOrigin
		 @GetMapping(value="/employeeDetails")
		 public   List<Map<String,Object>>  employeeDetails(@RequestParam(name="empid") String empid,@RequestParam(name="quarter") String quarter) {
		       logger.info(" In PEP369Controller :: getSupervisorLevel ");
			   return pep369GoalsService.employeeDetails(empid,quarter);   
		    }
		 @CrossOrigin
		 @GetMapping(value="/geCompetencyLeadLevel")
		 public   List<Map<String,Object>>  geCompetencyLeadLevel(@RequestParam(name="dId") String dId) {
		       logger.info(" In PEP369Controller :: geCompetencyLeadLevel ");
			   return pep369GoalsService.geCompetencyLeadLevel(dId);   
		    }
		 @CrossOrigin
		 @GetMapping(value="/getReportiesdata")
		 public   List<Map<String,Object>>  getReportiesdata(@RequestParam(name="eId") String eId) {
		       logger.info(" In PEP369Controller :: geCompetencyLeadLevel ");
			   return pep369GoalsService.getReportiesdata(eId);   
		    }
		  public File createFile(MultipartFile fileObj) throws IOException {
				 boolean isExistFile;
			        File newFile = null;
			        if (!fileObj.isEmpty()) {
			            String originalFilename = fileObj.getOriginalFilename();
			            newFile = new File(originalFilename);
			            isExistFile = newFile.createNewFile();
			            if (isExistFile) {
			                byte[] bytes = fileObj.getBytes();
			                try {
								Files.write(newFile.toPath(), bytes);
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
			            }
			        }
			        return newFile;
			}
		  private Object getCellValue(Cell cell) {
		        if (cell.getCellType() == CellType.STRING) {
		            return cell.getStringCellValue();
		        } else if (cell.getCellType() == CellType.NUMERIC) {
		        	Object numericValue = cell.getNumericCellValue();
		        	if(!numericValue.equals(null)) {
		        		Float value = Float.parseFloat(numericValue.toString());
		        		return value;
		        	}else {
		        		return numericValue;
		        	}
//		        	if (numericValue == (numericValue) && !(numericValue)) {
//		                return (long) numericValue; // or (int) numericValue
//		            } else {
//		                return numericValue;
//		            }
//		            return cell.getNumericCellValue();
		        } else if (cell.getCellType() == CellType.BOOLEAN) {
		            return cell.getBooleanCellValue();
		        } else if (cell.getCellType() == CellType.FORMULA) {
		            return cell.getCellFormula();
		        } else {
		            return null;
		        }
		    }
		  public List<Map<String, Object>> uploadExcelFile(File uploadedFile) {
		        List<Map<String, Object>> data = new ArrayList<>();

		        try {
		            FileInputStream fis = new FileInputStream(uploadedFile);
		            Workbook workbook = new XSSFWorkbook(fis); // Handle .xlsx files

		            Sheet sheet = workbook.getSheetAt(0); // Assuming it's the first sheet
		            Row headerRow = sheet.getRow(0);

		            for (int rowNum = 1; rowNum <= sheet.getLastRowNum(); rowNum++) {
		                Row row = sheet.getRow(rowNum);

		                Map<String, Object> rowData = new HashMap<>();
		                for (int cellNum = 0; cellNum < headerRow.getLastCellNum(); cellNum++) {
		                    Cell headerCell = headerRow.getCell(cellNum);
		                    Cell cell = row.getCell(cellNum);

		                    if (cell != null) {
		                        String header = headerCell.toString();
		                        Object cellValue = getCellValue(cell);

		                        rowData.put(header,  cellValue);
		                    }
		                }
		                data.add(rowData);
		            }

		            workbook.close();
		        } catch (Exception e) {
		            // Handle exceptions as needed
		        	e.printStackTrace();
		        }

		        return data;
		    }
			
			 @CrossOrigin
			@PostMapping("/getAllData")
		 public List<Map<String ,String>> getAllData(
				 @RequestParam(value="file",required = false) MultipartFile file)
						 throws IOException {
			 List<Map<String ,String>> response = new ArrayList<Map<String ,String>>();
			 
//			 String file1="C:\\Users\\Ar19969Po\\Downloads\\Book2(Sheet1).csv";
//			 
//			 File tempFile = new File(file1); 
//			   boolean exists = tempFile.exists();
//			   if(exists) {
//				   CSVReader reader=
//			               new CSVReaderBuilder(new FileReader(file1)).
//			                       withSkipLines(1). // Skipping firstline as it is header
//			                       build();	
//				   
//
//				   response = reader.readAll().stream().map(data-> { 
//					   
////					   System.out.println(data[0]);
////					   System.out.println(data[1]);
////					   System.out.println(data[2]);
//					   String id=data[0].toString();
//	            	   double nE=0;
//	            	 if(data[1]!=null && !Objects.equal(data[1], ""))
//	            	{
//	            		 System.out.println(data[1].toString());
//	            		 nE=Double.parseDouble(data[1].toString());	
//	            		 Double val=employeeLeavesRepository.getCFLNonEncashableValue(id);
//	            		 if(val!=null)
//	            		 {
//	            			 nE=nE+val; 
//	            		 }
//	            		
//	            	 }
//	            	 double eL=0;
//	            	 if(data[2]!=null && !Objects.equal(data[2], ""))
//	            	 {
//	            		 System.out.println(data[2].toString());
//	            		  eL=Double.parseDouble(data[2].toString());
//	            		  Double val1=employeeLeavesRepository.getECLEncashableValue(id);
//	            		  if(val1!=null)
//	            		  {
//	            			  eL=eL+val1; 
//	            		  }
//	            		  
//	            	 }	  
//	            	 employeeLeavesRepository.insertCFL(nE, id);
//	            	 employeeLeavesRepository.insertECL(eL, id);
//					   
//					   return new HashMap<String ,String>();
//					   
//				   }).collect(Collectors.toList());
//			   }
//		        
				 List<Map<String ,Object>> data=new ArrayList<Map<String ,Object>>();

		        if (file != null && (file.getOriginalFilename().endsWith(".xlsx") || file.getOriginalFilename().endsWith(".csv"))) {
		            File uploadedFile = createFile(file);
		            System.out.println(file.getOriginalFilename());
		            List<Map<String, Object>> excelData = uploadExcelFile(uploadedFile);

		            data.addAll(excelData);
		            System.out.println(data);
		            if (!data.isEmpty()) {
		               for(Map<String, Object> obj:data)
		               {
		            	   int ID=(int) Double.parseDouble(obj.get("ID").toString());
       	               String id= String.valueOf(ID);
		            	   double nE=0;
		            	 if(obj.get("Final NE")!=null && !Objects.equal(obj.get("Final NE"), ""))
		            	{
		            		 System.out.println(obj.get("Final NE").toString());
		            		 nE=Double.parseDouble(obj.get("Final NE").toString());	   
		            	 }
		            	 double eL=0;
		            	 if(obj.get("Current EL")!=null && !Objects.equal(obj.get("Current EL"), ""))
		            	 {
		            		 System.out.println(obj.get("Current EL").toString());
		            		  eL=Double.parseDouble(obj.get("Current EL").toString());
		            	 }	  
		            	 employeeLeavesRepository.insertCFL(nE, id);
		            	 employeeLeavesRepository.insertECL(eL, id);
		               }
		            }
		        }


		        return response;
		    }
	
}
