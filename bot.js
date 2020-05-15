const server = require('./server')
const recastai = require('recastai').default

// Instantiate Recast.AI SDK
const client = new recastai('823d9931a7337d8a11b04a6c4f26ebf4')

/*
 * Callback for BotConnector messages
 * Parameters:
 * - message: Message received from BotConnector
 */
const replyMessage = message => {
  // Get text from message received
  const text = message.content
  console.log('I receive: ', text)

  return client.request.analyseText(text)
    .then(nlp => {
      let reply = 'I\'m sorry but I don\'t understand what you are talking about.'
      try{
        var intent = nlp.intent()
        intent=intent.slug
        console.log(intent)
        throw intent
      }
      catch(intent){
        console.log(intent)
      }
      //Intent checking
      if(intent==="greetings"){
        message.addReply({
        type:'text',
        content:'Hi '+server.username+', I am the RGUKT Assistent(RIA).\nI am here to help you out.'
        })

        message.addReply({
          type:'text',
          content:"I'm bot.I am not smarter than you,\nplease ask related questions only:)"
        })

        message.addReply({
        type:'text',
        content:'You can ask me questions like below\n\n-How to apply\n\n-Admission Information\n\n-Certificates Information\n\n-Selection criteria\n\n-Annual fee\n\n-Websites\n\n-Campus tour\n\n-Helpline numbers'
        })
      }
      else if(intent==="websites") {
      message.addReply({
        type:'text',
        content:"Here are the websites of IIIT's.",
      })
      message.addReply({
            type: 'carousel',
            content: [
              {
                title: 'IIIT-NUZVID',
                imageUrl: 'https://getmyuni.azureedge.net/college-image/big/rajiv-gandhi-university-of-knowledge-technologies-rgukt-nuzvid.jpg',
                buttons: [
                  {
                    title: 'Go to Website',
                    type: 'web_url',
                    value: 'rguktn.ac.in'
                  }
                ]
              },
              {
                title: 'IIIT-RK VALLEY',
                imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSbiYhGH84ctypQ3qeucCIHg46jVYV0Vi5Rxn8zliSONNohnFr7A',
                buttons: [
                  {
                    title: 'Go to Website',
                    type: 'web_url',
                    value: 'rguktrkv.ac.in'
                  }
                ]
              }
            ]
      })
    }
    else if(intent=="admission-info"){
      message.addReply({
      type:'text',
      content:'Admission to the first year of 6-year integrated engineering programme in the University will be granted only after satisfactory verification and scrutiny of the details mentioned in the application and the original certificates/documents submitted by the candidate at the Certificate verification and Admission centre. Mere selection for certficate verification /documents will not guarantee admission to the candidate.',
      })
      message.addReply({
      type: 'quickReplies',
      content: {
      title: 'What are you looking for:?',
      buttons: [
          {
            title: 'Appply for admissions',
            value: 'Apply for admissions',
          },
          {
            title: 'Admission Procedure',
            value: 'Admission procedure',
          },
          {
            title: 'Eligibility for Admissions',
            value: 'Eligibility for admissions',
          },
          {
            title: 'Other state Admissions',
            value: 'other state admissions'
          }
        ]
    }
    })
    }

    else if(intent==="campus-tour") {
      message.addReply({
        type:'text',
        content:"Here are the videos of IIIT's.",
      })
      message.addReply({
            type: 'carousel',
            content: [
              {
                title: 'IIIT-NUZVID',
                imageUrl: 'http://rguktn.ac.in/assets_new/gallery/c.jpg',
                buttons: [
                  {
                    title: 'Watch',
                    type: 'web_url',
                    value: 'https://www.youtube.com/watch?v=6r47njBqNUM&t=446s',
                  }
                ]
              },
              {
                title: 'IIIT-RK VALLEY',
                imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSbiYhGH84ctypQ3qeucCIHg46jVYV0Vi5Rxn8zliSONNohnFr7A',
                buttons: [
                  {
                    title: 'Go to Website',
                    type: 'web_url',
                    value: 'rguktrkv.ac.in'
                  }
                ]
              }
            ]
      })
    }

    else if(intent==="apply-for-admissions"){
      message.addReply({
        type:'text',
        content:'a) The candidates should apply through APOnline services only.\nb) Application Fee: Rs. 150.00 (for OC and BC candidates) Rs. 100.00 (for SC and ST candidates)\nc) The application fee should be paid in cash at APOnline service center, for which the center will issue a receipt.\nd) An additional amount of Rs. 25.00 per application should be paid as service charges to the APOnline Centre.\ne) If any candidate applies more than once, then the latest application will be considered for the selection process.',
      })
    }
    else if(intent==="admission-procedure"){
      message.addReply({
        type:'text',
        content:'a) Admissions to the first year of Integrated B.TechProgram (2018-19) will be based on merit in the Grade Point Average (GPA) and Grade obtained in each subject and by following the statutory reservations of the State..\nb)Admission to 85% of total available seats shall be reserved for ‘local candidates’(Andhra Pradesh) and the remaining 15% of the seats are open to the students of Andhra Pradesh and Telangana states as specified in the Presidential Order 371 Article D in consonance to Section 95 of the A.P. Reorganization Act, 2014.',
      })
    }
    else if(intent==="admission-eligibility"){
      message.addReply({
        type:'text',
      content:'a)Candidates should have passed SSC (10th class) or any other equivalent examination recognized by the Governments of Andhra Pradesh &Telangana State, and conducted in 2018.\nb)Candidates should not have completed 18 years of age as on 31.12.2018, (21 years in case ofstudents belonging to SC and ST categories).\nc)International students shall be of Indian Nationality / Persons of Indian Origin (PIO)/Overseas Citizen of India (OCI) Card Holders.',
      })
    }

    else if(intent==="other-state-admissions"){
      message.addReply({
        type:'text',
      content:'a)Supernumerary seats to the extent of 5% are available to students belonging to States other than Andhra Pradesh & Telangana State including the children of Indians working in Gulf Countries / International and NRI students\nb)The tuition fee for students from other states and children of Indians working in Gulf Countries is Rs 1,36,000/- per annum. The tuition fee for International/NRI students is Rs 3,00,000/- per annum.\nc)Applicants from the States other than Andhra Pradesh & Telangana, children of Indians working in Gulf Countries, International and NRI students seeking admission at RGUKT shall apply through RGUKT website only.\nA seperate linkGUKT website only. A separate link is provided for the purpose at the institute website.\nd)The application fee for students from a State other than AP&Telangana is Rs.150/-\nThe application fee for children of Indians working in Gulf Countries,Internation and NRI is US$:25.00.\ne)Applicants who are children of Indians working in Gulf Countries, International and NRI students should pay the application fee through a Demand Draft drawn  favour of  Convener,\nUG Admissions– 18,\nRGUKT,\nBank Account Number:150810100040801,\nIFSC Code:ANDB0001508,\nBank Name: Andhra Bank,\nBranch Name: Acharya Nagarjuna University ',
      })
    }

    else if(intent==="contact-us"){
        message.addReply({
          type: 'text',
          content:'E-mail:admissions@rguktn.ac.in\n\nMobile No-1: 8333981196\n\nMobile No-2:9951537952'
      })
    }
    else if(intent==="get-help"){
      message.addReply({
        type: 'quickReplies',
        content: {
        title: 'What are you looking for:?',
        buttons: [
            {
              title: 'Exit',
              value: 'exit',
            },
            {
              title: 'Continue chat',
              value: 'menu',
            }
          ]
      }})
    }
    else if(intent==="certificate-verification"){
        message.addReply({
            type:'text',
            content:'The applicants should submit a print out copy of the application along with the following documents at the time of certificate verification and Admission. The proforma for the certificates mentioned below...\n\n1)The receipt issued by the AP Online services\n2)Hall Ticket of X standard (10th Class)\n3)GPA of 10th class Public Examination, i.e., SSC/CBSE/ICSE/NIOS.\n4)Residence certificate by those claiming Local category\n5)Residence certificate / service certificate of parents by those claiming Non-Local category\n6)Proof of caste / community certificate (SC/ST/BC) in the prescribed proforma by those claiming reservation under any of these categories\n7)Physically Handicapped (PH) certificate in the prescibed proforma by those claiming reservation under this category\n8)Children of Armed Forces (CAP) certificate in the prescribed proforma by those claiming reservation under this category\n9)NCC, Sports and games certificates by those claiming reservation under this category\n10)Note: If a candidate fails to submit any of the relevant certificates, he/she shall not be considered for admission.',
          })
    }

    else if(intent === "intimation-to-selected-students"){
      message.addReply({
         type:'text',
         content:'The list of provisionally selected candidates for counseling will be displayed on the University website www.rgukt.in\n\nThe candidates will also be informed by post,Email and SMS message,whichever possible, to the address/mobile number written in the application form.',
      })
    }

    else if(intent === "selection-method"){
      message.addReply({
        type:'text',
        content:'1)Admissions will be based on merit in the Grade Point Average (GPA) and Grade obtained in each subject, and as per the provisions of Presidential Order, 1974.\n\n2)Latest application will be considered in case of multiple applications.\n\n3)Last date for sending the hard copy of SSC grade card/marks memo after revaluation / recounting: 11.06.2018, 5:00 PM\n\n4)In case of a tie in GPA score, it will be resolved by adopting the following options in that sequence:\ni. Higher grade in Mathematics,\nii. Higher grade in General Science,\niii. Higher grade in English,\niv. Higher grade in Social Studies,\nv. Higher grade in 1st Language,\nvi. Older candidate as per the Date of Birth,\nvii. Lowest random number obtained from the hall ticket number.\n\nIf the tie is resolved with any of the check in the chronological order mentioned above, the next option(s) will not be checked.\n\nThe procedure of resolving by random number is as follows: For SSC, NIOS & OSSC applicants The random number will be obtained as the reminder of {253 x [first 5 digits of the hall ticket number] divided by the last 5 digits of the hall ticket number}.',
      })
      message.addReply({
        type: 'quickReplies',
        content: {
        title: 'Information about selction procedure',
        buttons: [
            {
              title: 'Intimation to selected students',
              value: 'intimation to selected students',
            },
            {
              title: 'Rules of reservation',
              value: 'rules of freservation',
            }
          ]
      }
      })
    }

    else if(intent === "rules-of-reservation"){
      message.addReply({
        type:'text',
        content:' Admission to 85% of total available seats shall be reserved for ‘local candidates’(Andhra Pradesh) and the remaining 15% of the seats are open to the students of Andhra Pradesh and Telangana states as specified in the Presidential Order 371 Article D in consonance to Section 95 of the A.P. Reorganization Act, 2014.\n\nThe rules of reservation for different categories are as under in both local and unreserved categories, subject to any changes and amendments made by the Government of Andhra Pradesh. i. SC - 15%, ST - 6%, BC-A - 7%, BC-B - 10%, BC-C - 1%, BC-D - 7%, BC-E - 4%, Physically Handicapped (PH) - 3%, Children of Armed Personnel (CAP) - 2%, NCC -1% and Sports - 0.5%.\n\nA horizontal reservation of 33 1/3 % of seats in favor of women candidates in each category (OC/SC/ST/BC/Special Categories) shall be ensured, wherever women candidates are available. iv. In case of PH candidates, certificates issued by the State Medical Board alone are acceptable. For Sports and CAP categories, certificates issued by the respective District Boards are acceptable. These reservations are applicable at state-level.\n\nGames & Sports only will be considered under Sports & Games category in respect of GO.MS.NO.10 Dated: 15-7-2008 of Youth advancement Tourism & Culture (Sports) Department.',
      })
    }

    else if(intent === "other-category-certificate-stack"){
      message.addReply({
        type:'text',
        content:'List of certificates enclosed:\n\n a) Hall ticket of 10th class or its equivalent\nb) Certificate showing the GPA of 10th class public examination, like SSC / CBSE / ICSE / NIOS.\nc) NCC certificate by those claiming reservation under this category (for details see Annexure – VII).\nd) Sports certificate(s) at the level of inter-district and above by those claiming reservation under\n\nPost to the following address:\n\nThe Convener, UG Admissions-2018,\n Rajiv Gandhi Universityof Knowledge Technologies,\n Flat Number 202,\n Second floor,\n NRI Block(C),\n Sri Mahendra Enclave,\n Tadepalli,\n Guntur District – 522501,\n Andhra Pradesh,\n India.'
      })
    } 
    else if(intent==="annual-fee"){
      message.addReply({
        type:'text',
        content:'a) The tuition fee for the candidates who studied in Schools situated in Andhra Pradesh &Telangana states is Rs.36,000/- per annum( for PUC1 & PUC II) and Rs 40000/- per annum(for four yearsengineering)\n\nStudents who are eligible for tuition fee reimbursement as per the guidelines issued by the respective State Governments have to pay the balance fee after deducting the tuition fee received from the respective State governments from the annual fee of the RGUKT (Students whose parental annual income is below Rs.1.0 Lakh for non SC/ST category and below Rs.2.0Lakh for SC/ST category and who fulfill the other conditions as per the latest Govt. Rules are eligible for fee reimbursement)\n\nc) Every student has to pay a registration fee of Rs.1,000/- (Rs.500/- for SC/ST candidates) and refundable caution deposit of Rs.2,000 (by all), that is a total ofRs.3,000/- (Rs 2,500/- in case of SC/ST candidates) at the time of admission.'
      })
    }
    else if(intent==="campus-tour"){
      message.addReply({
        type:'video',
        content:'sample.mp4',
      })
    }
    else if(intent==="goodbye"){
      message.addReply({
        type:'text',
        content:'bye bye'
      })
    }    
    else{
      message.addReply({
        type:'text',
        content:"I'm sorry.I didn't understand your question."
      })
    }
    return message.reply().then(p => p.body)
    })
}

/*
 * Main bot function
 * Parameters are:
 * - body: Request body
 * - response: Response of your server (can be a blank object if not needed: {})
 */
const reply = (request, response) => {
  return client.connect.handleMessage(request, response, replyMessage)
}

module.exports = {
  reply,
}
