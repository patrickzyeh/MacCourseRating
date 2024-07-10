import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By

# Selenium Driver Setup

driver_path = "/Users/patrickyeh/Desktop/chromedriver"
driver = webdriver.Chrome(driver_path)

COURSE_URL = "https://academiccalendars.romcmaster.ca/content.php?catoid=56&navoid=11345"

driver.get(COURSE_URL)

# Scrapping

number_of_pages = int(driver.find_element_by_xpath('//*[@id="table_block_n2_and_content_wrapper"]/table/tbody/tr[2]/td['
                                                   '2]/table/tbody/tr/td/table[2]/tbody/tr[107]/td/a[12]').text)

courses = []

# Looping through each page
for i in range(1, number_of_pages + 1):
    # Scraping courses from each page
    page_courses = driver.find_elements(By.CSS_SELECTOR, value=".width")

    for course in page_courses:
        courses.append(course.text.replace("•", "").replace("*", "").replace("A/B S", "").replace("A/B", "").strip().split(" - ", 1))

    try:
        next_page = driver.find_element(By.CSS_SELECTOR, value=f"[aria-label='Page {i + 1}']")
        next_page.click()
    except:
        break

# Storing courses in csv

course_codes = [course[0].strip() for course in courses]
course_title = [course[1].strip("\"") for course in courses]

course_dict = {
    "course_code": course_codes,
    "course_title": course_title
}

print(course_dict)

data = pd.DataFrame(course_dict)
data.to_csv("courses.csv")
